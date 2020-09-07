module.exports = ({ udt, desired_output, job_id }) => {
  switch (desired_output) {
    case "mask_pngs": {
      const tasks = []
      for (const [sampleIndex, sample] of Object.entries(udt.samples)) {
        tasks.push({
          task: "convert-to-mask-png",
          outputPath: `job:${job_id}:output:sample_${sampleIndex.padStart(
            6,
            "0"
          )}.png`,
          sampleIndex,
        })
      }
      tasks.push({
        task: "create-zip-and-upload-to-s3",
        inputKeys: `job:${job_id}:output:*`,
      })
      return tasks
    }
    case "mask_svgs_with_image":
    case "mask_svgs": {
      const tasks = []
      for (const [sampleIndex, sample] of Object.entries(udt.samples)) {
        tasks.push({
          task: "convert-to-mask-svg",
          withImage: desired_output.includes("with_image"),
          outputPath: `job:${job_id}:output:sample_${sampleIndex.padStart(
            6,
            "0"
          )}.svg`,
          sampleIndex,
        })
      }
      tasks.push({
        task: "create-zip-and-upload-to-s3",
        inputKeys: `job:${job_id}:output:*`,
      })
      return tasks
    }
    default: {
      throw new Error(
        `Couldn't do conversion for "${desired_output}", may not be implemented yet.`
      )
    }
  }
}
