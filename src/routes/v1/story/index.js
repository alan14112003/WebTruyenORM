import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import CategoryRouter from './Category.routes'
import AuthorRouter from './Author.routes'
// lấy ra bộ định tuyến
const StoryPackageRouter = express.Router()

StoryPackageRouter.use(
  '/categories',
  // , AuthMiddleware.checkLogin
  CategoryRouter
)

StoryPackageRouter.use(
  '/authors',
  // , AuthMiddleware.checkLogin
  AuthorRouter
)
export default StoryPackageRouter
