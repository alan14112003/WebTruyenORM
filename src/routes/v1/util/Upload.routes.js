import UploadController from '@/app/www/controllers/util/Upload.controller'
import MulterConfig from '@/config/Multer.config'
import express from 'express'
// lấy ra bộ định tuyến
const UploadRouter = express.Router()

UploadRouter.post('/destroy/single', UploadController.deleteSingleFile)

UploadRouter.post(
  '/single',
  MulterConfig.single('file'),
  UploadController.uploadSingleFile
)

export default UploadRouter
