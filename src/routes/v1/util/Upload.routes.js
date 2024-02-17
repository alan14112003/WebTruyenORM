import UploadController from '@/app/www/controllers/util/Upload.controller'
import MulterConfig from '@/config/Multer.config'
import express from 'express'
// lấy ra bộ định tuyến
const UploadRouter = express.Router()

UploadRouter.post(
  '/images/single',
  MulterConfig.single('image'),
  UploadController.uploadSingleImage
)

export default UploadRouter
