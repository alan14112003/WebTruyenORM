import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import ChapterController from '@/app/www/controllers/story/Chapter.controller'
import ChapterInsertValidator from '@/app/www/validators/body/chapter/Insert.validator'
import ChapterUpdateValidator from '@/app/www/validators/body/chapter/Update.validator'
import ChapterPublicValidator from '@/app/www/validators/body/chapter/Public.validator'
// lấy ra bộ định tuyến
const ChapterRouter = express.Router()

const PERMISSION_NAME = 'chapters.'
const PERMISSION_CODE = {
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  public: PERMISSION_NAME + 'public',
  update: PERMISSION_NAME + 'update',
  delete: PERMISSION_NAME + 'delete',
}

ChapterRouter.get(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.get),
  ChapterController.get
)

ChapterRouter.post(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.insert),
  ValidatorMiddleware.validateBody(ChapterInsertValidator),
  ChapterController.insert
)

ChapterRouter.put(
  '/public',
  AuthMiddleware.checkPermission(PERMISSION_CODE.public),
  ValidatorMiddleware.validateBody(ChapterPublicValidator),
  ChapterController.public
)

ChapterRouter.put(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  ValidatorMiddleware.validateBody(ChapterUpdateValidator),
  ChapterController.update
)

ChapterRouter.delete(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.delete),
  ChapterController.delete
)

export default ChapterRouter
