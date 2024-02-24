import RedisConfig from '@/config/Redis.config'
import Category from '@/app/models/Category.model'
import SequelizeConfig from '@/config/Sequelize.config'
import slugifyConfig from '@/config/Slugify.config'
import CategoryKeyEnum from '@/app/enums/redis_key/CategoryKey.enum'

const CategoryController = {
  all: async (req, res, next) => {
    try {
      let categories = await RedisConfig.get(CategoryKeyEnum.ALL)

      if (!categories) {
        categories = await Category.findAll()
      }

      RedisConfig.set(CategoryKeyEnum.ALL, categories)

      return res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.params

      const redisKey = `${CategoryKeyEnum.GET}.${id}`
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
        body.forEach((category) => {
          category.slug = slugifyConfig(category.name)
        })

        data = await Category.bulkCreate(body, {
          transaction: trx,
        })
      } else {
        body.slug = slugifyConfig(body.name)
        data = await Category.create(body, {
          transaction: trx,
        })
      }

      RedisConfig.del(CategoryKeyEnum.ALL)

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
      category.slug = slugifyConfig(category.name)

      const [updatedCount] = await Category.update(category, {
        where: {
          id: id,
        },
      })

      if (updatedCount) {
        RedisConfig.del(CategoryKeyEnum.ALL)
        RedisConfig.del(`${CategoryKeyEnum.GET}.${id}`)
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
        RedisConfig.del(CategoryKeyEnum.ALL)
        RedisConfig.del(`${CategoryKeyEnum.GET}.${id}`)
      }
      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },
}

export default CategoryController
