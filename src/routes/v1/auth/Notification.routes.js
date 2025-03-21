import NotificationController from '@/app/www/controllers/auth/Notification.controller'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import express from 'express'
// lấy ra bộ định tuyến
const NotificationRouter = express.Router()

const PERMISSION_NAME = 'notifications.'
const PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  checked: PERMISSION_NAME + 'checked',
}

NotificationRouter.get(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.all),
  NotificationController.all
)

NotificationRouter.put(
  '/:id/checked',
  AuthMiddleware.checkPermission(PERMISSION_CODE.checked),
  NotificationController.checked
)

export default NotificationRouter

export { PERMISSION_CODE as Notification_PERMISSION_CODE }