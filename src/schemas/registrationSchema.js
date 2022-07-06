import Joi from 'joi'
import User from '../models/userModel'

const emailIsAlreadyTaken = (user) => (value, helper) => {
  if (!user) {
    return value
  }

  if (user.email === value) {
    return helper.message('This email is already taken.')
  }
  return value
}

const registrationSchema = async (data) => {
  const foundUserWithEmail = await User.findOne({ email: data.email })

  return Joi.object({
    email: Joi.string()
      .email()
      .custom(emailIsAlreadyTaken(foundUserWithEmail), 'unique email')
      .required()
      .messages({
        'string.base': 'Email field should be string.',
        'string.email': 'Email field should have valid email structure.',
        'any.required': 'Email field is required.',
      }),
    password: Joi.string().alphanum().min(3).required().messages({
      'string.base': 'Password field should be string.',
      'string.alphanum': 'Password field should be alphanumeric.',
      'any.required': 'Password filed is required.',
      'string.min': `Password should have a minimum length of {#limit}`,
    }),
    repeatPassword: Joi.any().equal(Joi.ref('password')).required().messages({
      'any.only': 'Passwords does not match',
      'any.required': 'Repeat password filed is required.',
    }),
  })
}

export default registrationSchema
