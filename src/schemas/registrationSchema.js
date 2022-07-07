import Joi from 'joi'
import User from '../models/userModel'

const usernameShouldBeUniqueRule = (user) => (value, helper) => {
  if (!user) {
    return value
  }
  if (user.username === value) {
    return helper.message('This username is already taken.')
  }
  return value
}

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
  const foundUserWithUsername = await User.findOne({ username: data.username })
  const foundUserWithEmail = await User.findOne({ email: data.email })

  return Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .custom(
        usernameShouldBeUniqueRule(foundUserWithUsername),
        'unique username'
      )
      .required()
      .messages({
        'string.empty': `Username cannot be an empty field`,
        'string.base': 'Username field should be string.',
        'string.min': 'Username field should be at lease 3 characters long.',
        'string.max': 'Username field should be maximum 30 characters long.',
        'any.required': 'Username field is required.',
      }),
    email: Joi.string()
      .email()
      .custom(emailIsAlreadyTaken(foundUserWithEmail), 'unique email')
      .required()
      .messages({
        'string.empty': `Email cannot be an empty field`,
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
