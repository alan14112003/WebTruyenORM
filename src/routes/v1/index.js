import express from 'express'
import AuthPackageRouter from './auth'
import StoryPackageRouter from './story'
import UtilPackageRouter from './util'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import RateLimitMiddleware from '@/app/www/middleware/RateLimit.middleware'
// lấy ra bộ định tuyến
const RouterV1 = express.Router()

// giới hạn yêu cầu để chặn ddos
RouterV1.use(RateLimitMiddleware.limitRequest())

RouterV1.use(AuthPackageRouter)

// những route này phải xác thực người dùng
RouterV1.use(AuthMiddleware.checkAuth)

RouterV1.use(StoryPackageRouter)
RouterV1.use(UtilPackageRouter)

export default RouterV1
