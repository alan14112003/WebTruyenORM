import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import CategoryRouter from './Category.routes'
import AuthorRouter from './Author.routes'
// lấy ra bộ định tuyến
const StoryPackageRouter = express.Router()

StoryPackageRouter.use('/categories', AuthMiddleware.checkAuth, CategoryRouter)

StoryPackageRouter.use('/authors', AuthMiddleware.checkAuth, AuthorRouter)
export default StoryPackageRouter
