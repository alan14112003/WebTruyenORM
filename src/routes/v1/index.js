import express from 'express'
import AuthPackageRouter from './auth'
import StoryPackageRouter from './story'
import UtilPackageRouter from './util'
// lấy ra bộ định tuyến
const RouterV1 = express.Router()

RouterV1.use(AuthPackageRouter)
RouterV1.use(StoryPackageRouter)
RouterV1.use(UtilPackageRouter)

export default RouterV1
