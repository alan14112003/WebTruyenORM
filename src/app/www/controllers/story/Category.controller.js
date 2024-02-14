import RedisConfig from '@/config/Redis.config'
import Category from '@/app/models/Category.model'
import SequelizeConfig from '@/config/Sequelize.config'
import slugifyConfig from '@/config/Slugify.config'

const RedisKeyName = 'categories:'
const REDIS_KEY = {
  all: RedisKeyName + 'all',
  get: RedisKeyName + 'get',
}

const CategoryController = {
  all: async (req, res, next) => {
    try {
      let categories = await RedisConfig.get(REDIS_KEY.all)

      if (!categories) {
        categories = await Category.findAll()
      }

      RedisConfig.set(REDIS_KEY.all, categories)

      return res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.params

      const redisKey = `${REDIS_KEY.get}.${id}`
      let category = await RedisConfig.get(redisKey)

      if (!category) {
        category = await Category.findOne({
          where: { id: id },
        })
      }

      RedisConfig.set(redisKey, category)

      return res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  },

  insert: async (req, res, next) => {
    const trx = await SequelizeConfig.transaction()

    try {
      const body = req.body
      let data

      if (Array.isArray(body)) {
        data = await Category.bulkCreate(body, {
          transaction: trx,
        })

        data = await Promise.all(
          data.map(async (item) => {
            item.slug = slugifyConfig(item.name) + `-${item.id}`
            await item.save({
              transaction: trx,
            })
            return item
          })
        )
      } else {
        data = await Category.create(body, {
          transaction: trx,
        })
        data.slug = slugifyConfig(data.name) + `-${data.id}`

        await data.save({
          transaction: trx,
        })
      }

      RedisConfig.del(REDIS_KEY.all)

      trx.commit()
      return res.status(201).json(data)
    } catch (error) {
      trx.rollback()
      if (error.name == 'SequelizeUniqueConstraintError') {
        error.status = 409
      }
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.id
      const category = req.body
      category.slug = slugifyConfig(category.name) + `-${id}`

      const [updatedCount] = await Category.update(category, {
        where: {
          id: id,
        },
      })

      if (updatedCount) {
        RedisConfig.delWithPrefix(RedisKeyName)
      }

      return res.status(200).json(updatedCount)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.id
      const deletedCount = await Category.destroy({
        where: {
          id: id,
        },
      })
      if (deletedCount) {
        RedisConfig.del(REDIS_KEY.all)
        RedisConfig.del(`${REDIS_KEY.get}.${id}`)
      }
      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },
}

export default CategoryController
