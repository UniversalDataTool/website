const { send, json } = require("micro")
const getConversionTasks = require("../lib/get-conversion-tasks.js")
const doConversionTask = require("../lib/do-conversion-task.js")
const query = require("micro-query")
const { getRedisKey, setRedisKey } = require("../lib/redis.js")

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { udt, desired_output } = await json(req, { limit: "100mb" })

      if (!udt) {
        send(res, 400, "Did not provide 'udt' json dataset")
        return
      }

      const job_id = Math.random().toString(36).slice(-8)

      const tasks = getConversionTasks({ udt, job_id, desired_output })

      await setRedisKey(
        `job:${job_id}:details`,
        JSON.stringify({
          interface: udt.interface,
          currentTaskIndex: 0,
          desired_output,
          tasks,
          job_id,
        })
      )
      for (const [si, sample] of Object.entries(udt.samples)) {
        await setRedisKey(`job:${job_id}:sample[${si}]`, JSON.stringify(sample))
      }

      send(res, 200, {
        progress: 0,
        currentTaskIndex: 0,
        currentTask: "initializing...",
        job_id,
        totalTasks: tasks.length,
      })
    } else if (req.method === "GET") {
      const { job_id } = query(req)

      if (!job_id) {
        send(res, 400, "job_id is required")
      }

      let details = JSON.parse(await getRedisKey(`job:${job_id}:details`))

      const startTime = Date.now()

      while (
        Date.now() - startTime < 1000 &&
        details.currentTaskIndex < details.tasks.length
      ) {
        const additionalDetails = await doConversionTask(
          details.tasks[details.currentTaskIndex],
          details
        )
        if (additionalDetails) {
          details = { ...details, ...additionalDetails }
        }
        details.currentTaskIndex++
      }

      setRedisKey(`job:${job_id}:details`, JSON.stringify(details))

      send(res, 200, {
        currentTask:
          details.currentTaskIndex < details.tasks.length
            ? details.tasks[details.currentTaskIndex].task
            : "complete",
        progress: details.currentTaskIndex / details.tasks.length,
        downloadUrl: details.downloadUrl,
      })
    }
  } catch (e) {
    send(res, 500, e.toString())
  }
}
