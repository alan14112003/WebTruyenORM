import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import UserController from '@/app/www/controllers/story/User.controller'
// lấy ra bộ định tuyến
const UserRouter = express.Router()

const PERMISSION_NAME = 'users.'
const PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
}

UserRouter.get(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.all),
  UserController.all
)

export default UserRouter
