import Notification from '@/app/models/Notification.model'
import PaginationUtil from '@/app/utils/Pagination.util'

const NotificationController = {
  all: async (req, res, next) => {
    try {
      const auth = req.user

      const notifications = await PaginationUtil.paginate(Notification, 1, 5, {
        order: [['createdAt', 'desc']],
        where: {
          UserId: auth.id,
        },
      })

      return res.status(201).json(notifications)
    } catch (error) {
      next(error)
    }
  },
}

export default NotificationController
