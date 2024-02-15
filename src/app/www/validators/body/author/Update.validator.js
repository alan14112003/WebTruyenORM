import Joi from 'joi'

const AuthorUpdateValidator = Joi.object({
  name: Joi.string().required(),
})

export default AuthorUpdateValidator
