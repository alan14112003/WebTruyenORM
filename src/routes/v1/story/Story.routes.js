import express from 'express'
import StoryController from '@/app/www/controllers/story/Story.controller'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import StoryInsertValidator from '@/app/www/validators/body/story/Insert.validator'
import StoryUpdateValidator from '@/app/www/validators/body/story/Update.validator'
// lấy ra bộ định tuyến
const StoryRouter = express.Router()

const PERMISSION_NAME = 'stories.'
const PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  delete: PERMISSION_NAME + 'delete',
}

StoryRouter.get('/', StoryController.all)

StoryRouter.get('/:slugId', StoryController.get)

StoryRouter.post(
  '/',
  ValidatorMiddleware.validateBody(StoryInsertValidator),
  StoryController.insert
)

StoryRouter.put(
  '/:id',
  ValidatorMiddleware.validateBody(StoryUpdateValidator),
  StoryController.update
)

// StoryRouter.use(AuthMiddleware.checkAuth)

StoryRouter.delete(
  '/:id',
  // AuthMiddleware.checkPermission(PERMISSION_CODE.delete),
  StoryController.delete
)

export default StoryRouter
