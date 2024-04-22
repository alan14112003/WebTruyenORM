import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import RoleRouter from './Role.routes'
import PermissionRouter from './Permission.routes'
import AuthRouter from './Auth.routes'
import TransactionHistoryRouter from './TransactionHistory.routes'
import NotificationRouter from './Notification.routes'
// lấy ra bộ định tuyến
const AuthPackageRouter = express.Router()

AuthPackageRouter.use('/auth', AuthRouter)

AuthPackageRouter.use('/roles', AuthMiddleware.checkAuth, RoleRouter)

AuthPackageRouter.use(
  '/permissions',
  AuthMiddleware.checkAuth,
  PermissionRouter
)

AuthPackageRouter.use(
  '/transaction-histories',
  AuthMiddleware.checkAuth,
  TransactionHistoryRouter
)

AuthPackageRouter.use(
  '/notifications',
  AuthMiddleware.checkAuth,
  NotificationRouter
)

export default AuthPackageRouter
