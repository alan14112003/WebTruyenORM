import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import FollowStoryController from '@/app/www/controllers/story/FollowStory.controller'

// lấy ra bộ định tuyến
const FollowStoryRouter = express.Router()

const PERMISSION_NAME = 'follow_stories.'
const PERMISSION_CODE = {
  get: PERMISSION_NAME + 'get',
  update: PERMISSION_NAME + 'update',
}

FollowStoryRouter.get(
  '/:storyId',
  AuthMiddleware.checkPermission(PERMISSION_CODE.get),
  FollowStoryController.get
)

FollowStoryRouter.put(
  '/:storyId',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  FollowStoryController.update
)

export default FollowStoryRouter
