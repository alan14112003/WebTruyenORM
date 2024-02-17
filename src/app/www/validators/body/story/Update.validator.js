import Joi from 'joi'
import StoryTypeEnum from '@/app/enums/story/StoryType.enum'

const StoryUpdateValidator = Joi.object({
  name: Joi.string(),
  descriptions: Joi.string(),
  avatar: Joi.string(),
  type: Joi.number()
    .integer()
    .valid(...Object.keys(StoryTypeEnum.allName()).map((k) => Number(k))),
  AuthorId: Joi.number(),
  categories: Joi.array().items(Joi.number().required()),
  isFull: Joi.boolean(),
})

export default StoryUpdateValidator
