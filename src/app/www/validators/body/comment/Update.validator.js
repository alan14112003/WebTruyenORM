import Joi from 'joi'
import CommentTypeEnum from '@/app/enums/comment/CommentType.enum'

const CommentUpdateValidator = Joi.object({
  content: Joi.string(),
  type: Joi.number().valid(
    ...Object.keys(CommentTypeEnum.allName()).map((k) => Number(k))
  ),
})

export default CommentUpdateValidator
