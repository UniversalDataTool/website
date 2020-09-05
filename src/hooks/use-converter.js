import { useState, useMemo } from "react"
import useEventCallback from "use-event-callback"

export default () => {
  const [conversionRunning, setConversionRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const startConversion = useEventCallback(() => {
    setConversionRunning(true)
  })

  return useMemo(() => ({ progress, conversionRunning, startConversion }), [
    progress,
    conversionRunning,
  ])
}
