import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import LikeStoryController from '@/app/www/controllers/story/LikeStory.controller'

// lấy ra bộ định tuyến
const LikeStoryRouter = express.Router()

const PERMISSION_NAME = 'like_stories.'
const PERMISSION_CODE = {
  get: PERMISSION_NAME + 'get',
  update: PERMISSION_NAME + 'update',
}

LikeStoryRouter.get(
  '/:storyId',
  AuthMiddleware.checkPermission(PERMISSION_CODE.get),
  LikeStoryController.get
)

LikeStoryRouter.put(
  '/:storyId',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  LikeStoryController.update
)

export default LikeStoryRouter

export { PERMISSION_CODE as LikeStory_PERMISSION_CODE }
