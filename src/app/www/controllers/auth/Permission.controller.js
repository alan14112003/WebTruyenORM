import Permission from '@/app/models/Permission.model'
import PaginationUtil from '@/app/utils/Pagination.util'
import RedisConfig from '@/config/Redis.config'

const RedisKeyName = 'permissions:'
const REDIS_KEY = {
  all: RedisKeyName + 'all',
  get: RedisKeyName + 'get',
}

const PermissionController = {
  all: async (req, res, next) => {
    try {
      const { perPage, page } = req.query
      const redisKey = `${REDIS_KEY.all}.${perPage}-${page}`
      let permissions = await RedisConfig.get(redisKey)

      if (!permissions) {
        permissions = await PaginationUtil.paginate(Permission, page, perPage)
      }

      RedisConfig.set(redisKey, permissions)

      return res.status(200).json(permissions)
    } catch (error) {
      next(error)
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.params

      const redisKey = `${REDIS_KEY.get}.${id}`
      let permission = await RedisConfig.get(redisKey)

      if (!permission) {
        permission = await Permission.findByPk(id)
      }

      RedisConfig.set(redisKey, permission)
      return res.status(200).json(permission)
    } catch (error) {
      next(error)
    }
  },

  insert: async (req, res, next) => {
    try {
      let data
      const body = req.body

      if (Array.isArray(body)) {
        data = await Permission.bulkCreate(body)
      } else {
        data = await Permission.create(body)
      }

      RedisConfig.delWithPrefix(`${REDIS_KEY.all}`)
      return res.status(201).json(data)
    } catch (error) {
      if (error.name == 'SequelizeUniqueConstraintError') {
        error.status = 409
      }
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body

      const [updatedCount] = await Permission.update(body, {
        where: {
          id: id,
        },
      })

      if (updatedCount) {
        RedisConfig.del(`${REDIS_KEY.get}.${id}`)
      }

      return res.status(200).json(updatedCount)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params

      const deletedCount = await Permission.destroy({
        where: {
          id: id,
        },
      })

      if (deletedCount) {
        RedisConfig.delWithPrefix(REDIS_KEY.all)
      }

      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },
}

export default PermissionController
