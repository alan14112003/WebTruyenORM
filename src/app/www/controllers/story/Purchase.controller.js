import AuthKeyEnum from '@/app/enums/redis_key/AuthKey.enum'
import StatusCodeEnum from '@/app/enums/response_code/notification/StatusCode.enum'
import ChapterCodeEnum from '@/app/enums/response_code/story/ChapterCode.enum'
import PurchaseCodeEnum from '@/app/enums/response_code/story/PurchaseCode.enum'
import Chapter from '@/app/models/Chapter.model'
import Purchase from '@/app/models/Purchase.model'
import Story from '@/app/models/Story.model'
import User from '@/app/models/User.model'
import AuthUtil from '@/app/utils/Auth.util'
import RedisConfig from '@/config/Redis.config'
import SequelizeConfig from '@/config/Sequelize.config'

const PurchaseController = {
  buyChapter: async (req, res, next) => {
    const trx = await SequelizeConfig.transaction()

    try {
      const auth = req.user
      const purchasesDTO = req.body

      const chapter = await Chapter.findOne({
        where: {
          id: purchasesDTO.ChapterId,
        },
        include: [
          {
            model: Story,
            required: true,
            include: [
              {
                model: User,
                required: true,
                attributes: ['id', 'accountBalance'],
              },
            ],
          },
        ],
      })

      if (!chapter) {
        return res.status(400).json({
          code: ChapterCodeEnum.notFound,
          message: 'chapter not found',
        })
      }

      if (chapter.price > auth.accountBalance) {
        return res.status(400).json({
          code: PurchaseCodeEnum.balanceNotEnough,
          message: 'the balance in the account is not enough',
        })
      }

      await Promise.all([
        AuthUtil.purchases(auth, chapter.price, trx),
        Purchase.create(
          {
            UserId: auth.id,
            ChapterId: chapter.id,
            price: chapter.price,
          },
          {
            transaction: trx,
          }
        ),
        AuthUtil.receiveMoney(chapter.Story.User, chapter.price, trx),
      ])

      RedisConfig.del(`${AuthKeyEnum.ID}.${auth.id}`)
      RedisConfig.del(`${AuthKeyEnum.ID}.${chapter.Story.User.id}`)

      trx.commit()
      return res.status(200).json({
        code: PurchaseCodeEnum.success,
        message: 'buy chapter success',
      })
    } catch (error) {
      trx.rollback()
      console.log(error)
      next(error)
    }
  },
}

export default PurchaseController
