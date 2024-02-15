import RedisConfig from '@/config/Redis.config'
import SequelizeConfig from '@/config/Sequelize.config'
import slugifyConfig from '@/config/Slugify.config'
import Author from '@/app/models/Author.model'

const RedisKeyName = 'authors:'
const REDIS_KEY = {
  all: RedisKeyName + 'all',
  get: RedisKeyName + 'get',
}

const AuthorController = {
  all: async (req, res, next) => {
    try {
      let authors = await RedisConfig.get(REDIS_KEY.all)

      if (!authors) {
        authors = await Author.findAll()
      }

      RedisConfig.set(REDIS_KEY.all, authors)

      return res.status(200).json(authors)
    } catch (error) {
      next(error)
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.params

      const redisKey = `${REDIS_KEY.get}.${id}`
      let author = await RedisConfig.get(redisKey)

      if (!author) {
        author = await Author.findOne({
          where: { id: id },
        })
      }

      RedisConfig.set(redisKey, author)

      return res.status(200).json(author)
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
        body.forEach((author) => {
          author.slug = slugifyConfig(author.name)
        })

        data = await Author.bulkCreate(body, {
          transaction: trx,
        })
      } else {
        body.slug = slugifyConfig(body.name)
        data = await Author.create(body, {
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
      const author = req.body
      author.slug = slugifyConfig(author.name)

      const [updatedCount] = await Author.update(author, {
        where: {
          id: id,
        },
      })

      if (updatedCount) {
        RedisConfig.del(REDIS_KEY.all)
        RedisConfig.del(`${REDIS_KEY.get}.${id}`)
      }

      return res.status(200).json(updatedCount)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.id
      const deletedCount = await Author.destroy({
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

export default AuthorController
