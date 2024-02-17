import express from 'express'
import CategoryRouter from './Category.routes'
import AuthorRouter from './Author.routes'
import StoryRouter from './Story.routes'

// lấy ra bộ định tuyến
const StoryPackageRouter = express.Router()

StoryPackageRouter.use('/categories', CategoryRouter)

StoryPackageRouter.use('/authors', AuthorRouter)

StoryPackageRouter.use('/stories', StoryRouter)

export default StoryPackageRouter
