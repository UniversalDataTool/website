const AWS = require("aws-sdk")

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
})

module.exports = {
  upload: async (fileName, buffer) => {
    await new Promise((resolve, reject) => {
      s3.putObject(
        {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: fileName,
          Body: Buffer.from(buffer),
          ContentType: "application/zip",
        },
        (err, data) => {
          if (err) return reject(err)
          resolve(data)
        }
      )
    })
    const downloadUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Expires: 60 * 60, // 1 hour
    })

    return { downloadUrl }
  },
}
