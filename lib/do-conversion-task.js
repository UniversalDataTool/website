const { sampleToPNG } = require("udt-to-png/index.js")
const { sampleToSVG } = require("udt-to-svg")
const probe = require("probe-image-size")
const { getRedisKey, setRedisKey, getRedisKeys } = require("./redis")
const JSZip = require("jszip")
const aws = require("./aws")

module.exports = async (task, details) => {
  switch (task.task) {
    case "convert-to-mask-png": {
      const sample = JSON.parse(
        await getRedisKey(`job:${details.job_id}:sample[${task.sampleIndex}]`)
      )
      const { pngBuffer } = await sampleToPNG(sample)
      await setRedisKey(task.outputPath, pngBuffer)
      return
    }
    case "convert-to-mask-svg": {
      const sample = JSON.parse(
        await getRedisKey(`job:${details.job_id}:sample[${task.sampleIndex}]`)
      )
      if (!sample.imageUrl) throw new Error("Sample does not have imageUrl")
      const { width, height } = await probe(sample.imageUrl)
      const svg = await sampleToSVG(sample, {
        width,
        height,
        showImage: task.withImage,
      })
      await setRedisKey(task.outputPath, svg)
      return
    }
    case "create-zip-and-upload-to-s3": {
      console.log("starting zipping...")
      const keys = await getRedisKeys(task.inputKeys)
      const zip = new JSZip()
      for (const key of keys) {
        console.log(`Got key from output:`, key.toString())
        zip.file(
          key.toString().split(":").pop(),
          await getRedisKey(key.toString())
        )
      }
      console.log("generating zip file...")
      const zipBuffer = await zip.generateAsync({ type: "uint8array" })
      console.log(`generated zip file (${zipBuffer.length})`)

      console.log("uploading to s3...")
      const { downloadUrl } = await aws.upload(
        details.job_id + ".zip",
        zipBuffer
      )
      return { downloadUrl }
    }
    default: {
      throw new Error(`Unknown Task: ${task.task}`)
    }
  }
}
