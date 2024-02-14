import RoleController from '@/app/www/controllers/auth/Role.controller'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import RoleInsertValidator from '@/app/www/validators/body/role/RoleInsert.validator'
import RoleUpdateValidator from '@/app/www/validators/body/role/RoleUpdate.validator'
import express from 'express'
// lấy ra bộ định tuyến
const RoleRouter = express.Router()

const PERMISSION_NAME = 'roles.'
const PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  delete: PERMISSION_NAME + 'delete',
}

RoleRouter.get(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.all),
  RoleController.all
)

RoleRouter.get(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.get),
  RoleController.get
)

RoleRouter.post(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.insert),
  ValidatorMiddleware.validateBody(RoleInsertValidator),
  RoleController.insert
)

RoleRouter.put(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  ValidatorMiddleware.validateBody(RoleUpdateValidator),
  RoleController.update
)

RoleRouter.delete(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.delete),
  RoleController.delete
)

export default RoleRouter
