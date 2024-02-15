import Joi from 'joi'

const AuthorObject = Joi.object({
  name: Joi.string().required(),
})

const AuthorInsertValidator = Joi.alternatives().try(
  AuthorObject,
  Joi.array().items(AuthorObject)
)

export default AuthorInsertValidator
