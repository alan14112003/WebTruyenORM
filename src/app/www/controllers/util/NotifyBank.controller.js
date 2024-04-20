import NotificationTypeEnum from '@/app/enums/notification/NotificationType.enum'
import AuthKeyEnum from '@/app/enums/redis_key/AuthKey.enum'
import UserKeyEnum from '@/app/enums/redis_key/UserKey.enum'
import TransactionHistory from '@/app/models/TransactionHistory.model'
import User from '@/app/models/User.model'
import NotificationUtil from '@/app/utils/Notification.util'
import RedisConfig from '@/config/Redis.config'

const NotifyBankController = {
  sendNotify: async (req, res, next) => {
    try {
      const { content } = req.body
      console.log(content)
      const regex = /II(.*?)OO/

      const matchResult = content.match(regex)

      if (!matchResult) {
        return res.status(400).json({
          message: 'error: content not match',
        })
      }

      // Nếu có khớp, phần tử thứ hai trong mảng (index 1) sẽ chứa nội dung cần lấy
      const extractedContent = matchResult[1].trim()
      const transactionCode = extractedContent.slice(0, 6)

      // Lấy các số còn lại sau 6 số đầu tiên
      const transactionId = extractedContent.slice(6)

      // thực hiện lấy ra transaction history
      const transactionHistory = await TransactionHistory.findOne({
        where: {
          id: transactionId,
          code: transactionCode,
        },
      })

      if (!transactionHistory) {
        return res.status(400).json({
          message: 'error: code or id not match',
        })
      }

      await Promise.all([
        (async () => {
          const user = await User.findByPk(transactionHistory.UserId)
          if (user) {
            user.accountBalance += transactionHistory.money

            await user.save()
            RedisConfig.del(`${AuthKeyEnum.ID}.${user.id}`)

            const contentNotify = NotificationUtil.createContentNotify(
              NotificationTypeEnum.TRANSACTION_HISTORY_IN,
              'Đã xác nhận nạp tiền'
            )
            NotificationUtil.createNotification(contentNotify, null, user.id)
          }
        })(),
        transactionHistory.update({
          check: true,
        }),
      ])

      return res.json({
        message: 'success',
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
}

export default NotifyBankController
