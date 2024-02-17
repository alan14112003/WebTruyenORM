import express from 'express'
import CategoryController from '@/app/www/controllers/story/Category.controller'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import CategoryInsertValidator from '@/app/www/validators/body/category/Insert.validator'
import CategoryUpdateValidator from '@/app/www/validators/body/category/Update.validator'
// lấy ra bộ định tuyến
const CategoryRouter = express.Router()

const PERMISSION_NAME = 'categories.'
const PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  delete: PERMISSION_NAME + 'delete',
}

CategoryRouter.get('/', CategoryController.all)

CategoryRouter.get('/:id', CategoryController.get)

CategoryRouter.use(AuthMiddleware.checkAuth)

CategoryRouter.post(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.insert),
  ValidatorMiddleware.validateBody(CategoryInsertValidator),
  CategoryController.insert
)

CategoryRouter.put(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  ValidatorMiddleware.validateBody(CategoryUpdateValidator),
  CategoryController.update
)

CategoryRouter.delete(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.delete),
  CategoryController.delete
)

export default CategoryRouter
