import UploadController from '@/app/www/controllers/util/Upload.controller'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import MulterConfig from '@/config/Multer.config'
import express from 'express'
// lấy ra bộ định tuyến
const UploadRouter = express.Router()

const PERMISSION_NAME = 'uploads.'
const PERMISSION_CODE = {
  single: PERMISSION_NAME + 'single',
  destroy: {
    single: PERMISSION_NAME + 'destroy.single',
  },
}

UploadRouter.post(
  '/destroy/single',
  AuthMiddleware.checkPermission(PERMISSION_CODE.destroy.single),
  UploadController.deleteSingleFile
)

UploadRouter.post(
  '/single',
  AuthMiddleware.checkPermission(PERMISSION_CODE.single),
  MulterConfig.single('file'),
  UploadController.uploadSingleFile
)

export default UploadRouter
