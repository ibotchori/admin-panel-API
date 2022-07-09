import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import registrationSchema from '../schemas/registrationSchema'
import loginSchema from '../schemas/loginSchema'

/* Generate JWT */
const generateToken = (id) =>
  // it takes 3 argument. 1 payload, passed in {id} (set the id in the token). 2 secret. 3 expires in
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

// @desc Register new user
// @route POST /register
// @access Public
export const register = asyncHandler(async (req, res) => {
  /* Validation with Joi */
  const validator = await registrationSchema(req.body)
  const { value: data, error } = validator.validate(req.body)

  if (error) {
    //  return res.status(422).json(error.details)
    res.status(422)
    throw new Error(error.details[0].message)
  }
  // value from Joi
  const { email, password, username } = data

  // Hash password
  // create salt
  const salt = await bcrypt.genSalt(10)
  // generate hashed password with salt (password = entered password, from request body)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create User
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })
  // back user information on response
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    })
  }
})

// @desc Authenticate a user
// @route POST /login
// @access Public
export const login = asyncHandler(async (req, res) => {
  /* Validation with Joi */
  const validator = await loginSchema(req.body)
  const { value: data, error } = validator.validate(req.body)

  if (error) {
    //  return res.status(422).json(error.details)
    res.status(422)
    throw new Error(error.details[0].message)
  }
  // value from Joi
  const { email, password } = data

  // check if user is already in database and password is correct
  const userExist = await User.findOne({ email })
  const passwordIsCorrect = await bcrypt.compare(password, userExist.password)
  if (userExist && passwordIsCorrect) {
    // back token on response
    res.json({
      token: generateToken(userExist._id),
    })
  } else {
    // if password is incorrect
    res.status(400)
    throw new Error('Please, provide correct credentials...')
  }
})

// @desc Authenticate a user
// @route GET /user
// @access Public
export const getUser = asyncHandler(async (req, res) => {
  // get user data (from the middleware) on response
  const { username, _id, email } = req.user
  res.status(200).json({ _id, username, email })
})
