import Joi from 'joi'
import StoryTypeEnum from '@/app/enums/story/StoryType.enum'

const ChapterUpdateValidator = Joi.object({
  name: Joi.string(),
  number: Joi.number().min(0),
  content: Joi.string(),
  isFree: Joi.boolean(),
  privateEnd: Joi.date(),
  price: Joi.number().min(0),
  StoryId: Joi.number(),
  type: Joi.number()
    .integer()
    .valid(...Object.keys(StoryTypeEnum.allName()).map((k) => Number(k))),
})

export default ChapterUpdateValidator
