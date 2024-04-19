import StoryTypeEnum from '@/app/enums/story/StoryType.enum'
import Joi from 'joi'

const ChapterInsertValidator = Joi.object({
  name: Joi.string(),
  number: Joi.number().required().min(0),
  content: Joi.string().required(),
  isFree: Joi.boolean().required(),
  privateEnd: Joi.date(),
  price: Joi.number().min(0).when('isFree', {
    is: false,
    then: Joi.required(),
  }),
  StoryId: Joi.number().required(),
  type: Joi.number()
    .required()
    .integer()
    .valid(...Object.keys(StoryTypeEnum.allName()).map((k) => Number(k))),
})

export default ChapterInsertValidator
