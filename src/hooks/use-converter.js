import { useState, useEffect, useMemo, useRef } from "react"
import useEventCallback from "use-event-callback"

export default () => {
  const [conversionRunning, setConversionRunning] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState()
  const [error, setError] = useState()
  const [job_id, setJobId] = useState()
  const [task, setTask] = useState()
  const [progress, setProgress] = useState(0)
  const pollingTimeout = useRef()

  const resetConversion = useEventCallback(() => {
    setConversionRunning(false)
    setDownloadUrl(null)
    setError(null)
    setTask(null)
    setJobId(null)
    setProgress(0)
    clearTimeout(pollingTimeout.current)
  })

  const pollForJob = useEventCallback(async () => {
    if (!job_id) {
      clearTimeout(pollingTimeout.current)
      return
    }

    const res = await fetch(
      `/api/convert-from-udt?job_id=${job_id}`
    ).then((r) => r.json())

    setProgress(res.progress)
    setTask(res.currentTask)

    if (res.downloadUrl) {
      setDownloadUrl(res.downloadUrl)
    }

    if (res.currentTask !== "complete") {
      pollingTimeout.current = setTimeout(pollForJob, 100)
    }
  })

  useEffect(() => {
    if (conversionRunning) {
      pollForJob()
    }
    return () => {
      clearTimeout(pollingTimeout.current)
    }
  }, [conversionRunning, setProgress, job_id])

  const startConversion = useEventCallback(async (udt, desired_output) => {
    clearTimeout(pollingTimeout.current)

    try {
      const res = await fetch("/api/convert-from-udt", {
        method: "POST",
        body: JSON.stringify({
          udt,
          desired_output: desired_output.toLowerCase().replace(/ /g, "_"),
        }),
        headers: { "Content-Type": "application/json" },
      }).then(async (r) => {
        if (r.status !== 200) {
          throw new Error(await r.text())
        } else {
          return r.json()
        }
      })

      setTask(res.currentTask)
      setProgress(res.progress)
      setJobId(res.job_id)
      setConversionRunning(true)
    } catch (e) {
      setConversionRunning(false)
      setError(e.toString())
    }
  })

  return useMemo(
    () => ({
      progress,
      conversionRunning,
      startConversion,
      task,
      downloadUrl,
      error,
      resetConversion,
    }),
    [progress, conversionRunning, task, downloadUrl, error]
  )
}
