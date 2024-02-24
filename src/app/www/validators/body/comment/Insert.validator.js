import Joi from 'joi'
import CommentTypeEnum from '@/app/enums/comment/CommentType.enum'

const CommentInsertValidator = Joi.object({
  content: Joi.string().required(),
  StoryId: Joi.number().required(),
  parentId: Joi.number(),
  type: Joi.number()
    .required()
    .valid(...Object.keys(CommentTypeEnum.allName()).map((k) => Number(k))),
})

export default CommentInsertValidator
