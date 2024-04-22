import NotificationController from '@/app/www/controllers/auth/Notification.controller'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import express from 'express'
// lấy ra bộ định tuyến
const NotificationRouter = express.Router()

const PERMISSION_NAME = 'notifications.'
const PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
}

NotificationRouter.get(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.all),
  NotificationController.all
)

export default NotificationRouter
