import RedisConfig from '@/config/Redis.config'
import SequelizeConfig from '@/config/Sequelize.config'
import slugifyConfig from '@/config/Slugify.config'
import Author from '@/app/models/Author.model'
import AuthorKeyEnum from '@/app/enums/redis_key/AuthorKey.enum'

const AuthorController = {
  all: async (req, res, next) => {
    try {
      let authors = await RedisConfig.get(AuthorKeyEnum.ALL)

      if (!authors) {
        authors = await Author.findAll()
      }

      RedisConfig.set(AuthorKeyEnum.ALL, authors)

      return res.status(200).json(authors)
    } catch (error) {
      next(error)
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.params

      const redisKey = `${AuthorKeyEnum.GET}.${id}`
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

      RedisConfig.del(AuthorKeyEnum.ALL)

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
        RedisConfig.del(AuthorKeyEnum.ALL)
        RedisConfig.del(`${AuthorKeyEnum.GET}.${id}`)
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
        RedisConfig.del(AuthorKeyEnum.ALL)
        RedisConfig.del(`${AuthorKeyEnum.GET}.${id}`)
      }

      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },
}

export default AuthorController
