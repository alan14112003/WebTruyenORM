import express from 'express'
import StoryController from '@/app/www/controllers/story/Story.controller'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import StoryInsertValidator from '@/app/www/validators/body/story/Insert.validator'
import StoryUpdateValidator from '@/app/www/validators/body/story/Update.validator'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ChapterController from '@/app/www/controllers/story/Chapter.controller'
import CommentController from '@/app/www/controllers/story/Comment.controller'
// lấy ra bộ định tuyến
const StoryRouter = express.Router()

const PERMISSION_NAME = 'stories.'
const PERMISSION_CODE = {
  allByAuth: PERMISSION_NAME + 'all_by_auth',
  all: PERMISSION_NAME + 'all',
  chaptersByAuth: PERMISSION_NAME + 'chapters_by_auth',
  chapters: PERMISSION_NAME + 'chapters',
  comments: PERMISSION_NAME + 'comments',
  getByAuth: PERMISSION_NAME + 'get_by_auth',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  public: PERMISSION_NAME + 'public',
  delete: PERMISSION_NAME + 'delete',
  hardDelete: PERMISSION_NAME + 'hard_delete',
}

StoryRouter.get(
  '/auth',
  AuthMiddleware.checkPermission(PERMISSION_CODE.allByAuth),
  StoryController.allByAuth
)

StoryRouter.get(
  '/auth/:slugId',
  AuthMiddleware.checkPermission(PERMISSION_CODE.getByAuth),
  StoryController.getByAuth
)

StoryRouter.get(
  '/auth/:slugId/chapters',
  AuthMiddleware.checkPermission(PERMISSION_CODE.chaptersByAuth),
  ChapterController.allByStoryIdAuth
)

StoryRouter.get(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.all),
  StoryController.all
)

StoryRouter.get(
  '/:slugId',
  AuthMiddleware.checkPermission(PERMISSION_CODE.get),
  StoryController.get
)

StoryRouter.post(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.insert),
  ValidatorMiddleware.validateBody(StoryInsertValidator),
  StoryController.insert
)

StoryRouter.put(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  ValidatorMiddleware.validateBody(StoryUpdateValidator),
  StoryController.update
)

StoryRouter.put(
  '/:id/public',
  AuthMiddleware.checkPermission(PERMISSION_CODE.public),
  StoryController.public
)

StoryRouter.delete(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.delete),
  StoryController.delete
)

StoryRouter.delete(
  '/:id/hard',
  AuthMiddleware.checkPermission(PERMISSION_CODE.hardDelete),
  StoryController.hardDelete
)

// chapters
StoryRouter.get(
  '/:slugId/chapters',
  AuthMiddleware.checkPermission(PERMISSION_CODE.chapters),
  ChapterController.allByStoryId
)

// comments
StoryRouter.get(
  '/:slugId/comments',
  AuthMiddleware.checkPermission(PERMISSION_CODE.comments),
  CommentController.allByStoryId
)

export default StoryRouter
