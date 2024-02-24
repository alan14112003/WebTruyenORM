import RoleKeyEnum from '@/app/enums/redis_key/RoleKey.enum'
import Role from '@/app/models/Role.model'
import PaginationUtil from '@/app/utils/Pagination.util'
import RedisConfig from '@/config/Redis.config'

const RoleController = {
  all: async (req, res, next) => {
    try {
      const { perPage, page } = req.query

      const redisKey = `${RoleKeyEnum.ALL}.${perPage}-${page}`
      let roles = await RedisConfig.get(redisKey)

      if (!roles) {
        roles = await PaginationUtil.paginate(Role, page, perPage)
      }

      RedisConfig.set(redisKey, roles)

      return res.status(200).json(roles)
    } catch (error) {
      next(error)
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.params

      const redisKey = `${RoleKeyEnum.GET}.${id}`
      let role = await RedisConfig.get(redisKey)

      if (!role) {
        role = await Role.findByPk(id)
      }

      RedisConfig.set(redisKey, role)

      return res.status(200).json(role)
    } catch (error) {
      next(error)
    }
  },

  insert: async (req, res, next) => {
    try {
      let data
      const body = req.body

      if (Array.isArray(body)) {
        data = await Role.bulkCreate(body)
      } else {
        data = await Role.create(body)
      }

      RedisConfig.delWithPrefix(`${RoleKeyEnum.ALL}`)
      return res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body

      const [role] = await Role.update(body, {
        where: {
          id: id,
        },
      })

      if (role) {
        RedisConfig.del(`${RoleKeyEnum.GET}.${id}`)
        RedisConfig.delWithPrefix(`${RoleKeyEnum.ALL}`)
      }

      return res.status(200).json(role)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params

      const deletedCount = await Role.destroy({
        where: {
          id: id,
        },
      })

      if (deletedCount) {
        RedisConfig.del(`${RoleKeyEnum.GET}.${id}`)
        RedisConfig.delWithPrefix(`${RoleKeyEnum.ALL}`)
      }

      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },
}

export default RoleController
