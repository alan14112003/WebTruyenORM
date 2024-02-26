import StoryTypeEnum from '@/app/enums/story/StoryType.enum'
import Joi from 'joi'

const StoryInsertValidator = Joi.object({
  name: Joi.string().required(),
  descriptions: Joi.string().required(),
  avatar: Joi.string().required(),
  type: Joi.number()
    .required()
    .integer()
    .valid(...Object.keys(StoryTypeEnum.allName()).map((k) => Number(k))),
  AuthorId: Joi.number(),
  categories: Joi.array().items(Joi.number().required()).required(),
})

export default StoryInsertValidator
