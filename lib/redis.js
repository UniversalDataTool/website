const { promisify } = require("util")
const redis = require("redis")

const client = redis.createClient({
  url: process.env.REDIS_URL,
  return_buffers: true,
})
const getRedisKey = promisify(client.get).bind(client)
const setRedisKey = (k, v) =>
  promisify(client.set).bind(client)(k, v, "EX", 60 * 60)
const getRedisKeys = promisify(client.keys).bind(client)

client.on("error", (error) => {
  console.log("REDIS ERROR:", error)
})

module.exports = {
  getRedisKey,
  setRedisKey,
  getRedisKeys,
}
