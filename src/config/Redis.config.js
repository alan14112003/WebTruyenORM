import { createClient } from 'redis'

const client = createClient()
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()

const RedisConfig = {
  get: async (key) => {
    const data = await (await client).get(key)
    if (!data) {
      return data
    }
    return JSON.parse(data)
  },

  /**
   * @param { import("redis").SetOptions } options
   */
  set: async (key, value, options = null) => {
    return value
      ? (await client).set(key, JSON.stringify(value), {
          EX: 3600,
          ...options,
        })
      : value
  },

  del: async (key) => {
    return await (await client).del(key)
  },

  delWithPrefix: async (prefix) => {
    let count = 0
    const { keys } = await (
      await client
    ).scan(0, {
      MATCH: `${prefix}*`,
    })

    // Xóa từng khóa phù hợp với điều kiện
    await Promise.all(
      keys.map(async (key) => {
        await RedisConfig.del(key)
        count++
      })
    )

    return count
  },
}

export default RedisConfig
