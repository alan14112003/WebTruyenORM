import PermissionController from '@/app/www/controllers/auth/Permission.controller'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import PermissionInsertValidator from '@/app/www/validators/body/permission/PermissionInsert.validator'
import PermissionUpdateValidator from '@/app/www/validators/body/permission/PermissionUpdate.validator'
import express from 'express'
// lấy ra bộ định tuyến
const PermissionRouter = express.Router()

const PERMISSION_NAME = 'permissions.'
const PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  delete: PERMISSION_NAME + 'delete',
}

PermissionRouter.get(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.all),
  PermissionController.all
)

PermissionRouter.get(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.get),
  PermissionController.get
)

PermissionRouter.post(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.insert),
  ValidatorMiddleware.validateBody(PermissionInsertValidator),
  PermissionController.insert
)

PermissionRouter.put(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  ValidatorMiddleware.validateBody(PermissionUpdateValidator),
  PermissionController.update
)

PermissionRouter.delete(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.delete),
  PermissionController.delete
)

export default PermissionRouter
