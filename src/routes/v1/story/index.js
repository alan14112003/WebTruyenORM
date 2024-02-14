import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import CategoryRouter from './Category.routes'
// lấy ra bộ định tuyến
const StoryPackageRouter = express.Router()

StoryPackageRouter.use(
  '/categories',
  // , AuthMiddleware.checkLogin
  CategoryRouter
)

export default StoryPackageRouter
