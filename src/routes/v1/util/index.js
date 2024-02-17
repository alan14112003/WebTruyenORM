import express from 'express'
import UploadRouter from './Upload.routes'

// lấy ra bộ định tuyến
const UtilPackageRouter = express.Router()

UtilPackageRouter.use('/uploads', UploadRouter)

export default UtilPackageRouter
