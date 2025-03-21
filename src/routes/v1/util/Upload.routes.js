import UploadController from '@/app/www/controllers/util/Upload.controller'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import UploadDeleteMultipleValidator from '@/app/www/validators/body/upload/DeleteMultiple.validator'
import MulterConfig from '@/config/Multer.config'
import express from 'express'
// lấy ra bộ định tuyến
const UploadRouter = express.Router()

const PERMISSION_NAME = 'uploads.'
const PERMISSION_CODE = {
  single: PERMISSION_NAME + 'single',
  multiple: PERMISSION_NAME + 'multiple',
  destroy_single: PERMISSION_NAME + 'destroy.single',
  destroy_multiple: PERMISSION_NAME + 'destroy.multiple',
}

UploadRouter.delete(
  '/single',
  AuthMiddleware.checkPermission(PERMISSION_CODE.destroy_single),
  UploadController.deleteSingleFile
)

UploadRouter.delete(
  '/multiple',
  AuthMiddleware.checkPermission(PERMISSION_CODE.destroy_multiple),
  ValidatorMiddleware.validateBody(UploadDeleteMultipleValidator),
  UploadController.deleteMultipleFile
)

UploadRouter.post(
  '/single',
  AuthMiddleware.checkPermission(PERMISSION_CODE.single),
  MulterConfig.single('file'),
  UploadController.uploadSingleFile
)

UploadRouter.post(
  '/multiple',
  AuthMiddleware.checkPermission(PERMISSION_CODE.multiple),
  UploadController.uploadMultipleFile
)

export default UploadRouter

export { PERMISSION_CODE as Upload_PERMISSION_CODE }
