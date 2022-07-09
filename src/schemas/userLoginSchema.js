import Joi from 'joi'
import User from '../models/userModel'

const determineIfUserExists = (user) => (value, helpers) => {
  if (!user) {
    return helpers.message('There is no user with this email.')
  }
  return value
}

const userLoginSchema = async (data) => {
  const user = await User.findOne({ email: data.email })

  return Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': `Email cannot be an empty field`,
        'string.base': 'Email field should be string.',
        'string.email': 'Email field should have valid email structure.',
        'any.required': 'Email field is required.',
      })
      .custom(determineIfUserExists(user)),
    password: Joi.string().required().messages({
      'string.empty': `Password cannot be an empty field`,
      'string.base': 'Password field should be string.',
      'any.required': 'Password field is required.',
    }),
  })
}

export default userLoginSchema
