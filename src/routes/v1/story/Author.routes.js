import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import AuthorController from '@/app/www/controllers/story/Author.controller'
import AuthorInsertValidator from '@/app/www/validators/body/author/Insert.validator'
import AuthorUpdateValidator from '@/app/www/validators/body/author/Update.validator'
// lấy ra bộ định tuyến
const AuthorRouter = express.Router()

const PERMISSION_NAME = 'authors.'
const PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  delete: PERMISSION_NAME + 'delete',
}

AuthorRouter.get(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.all),
  AuthorController.all
)

AuthorRouter.get(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.get),
  AuthorController.get
)

AuthorRouter.post(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.insert),
  ValidatorMiddleware.validateBody(AuthorInsertValidator),
  AuthorController.insert
)

AuthorRouter.put(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  ValidatorMiddleware.validateBody(AuthorUpdateValidator),
  AuthorController.update
)

AuthorRouter.delete(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.delete),
  AuthorController.delete
)

export default AuthorRouter
