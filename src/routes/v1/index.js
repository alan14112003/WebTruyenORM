import express from 'express'
import AuthPackageRouter from './auth'
import StoryPackageRouter from './story'
// lấy ra bộ định tuyến
const RouterV1 = express.Router()

RouterV1.use(AuthPackageRouter)
RouterV1.use(StoryPackageRouter)

export default RouterV1
