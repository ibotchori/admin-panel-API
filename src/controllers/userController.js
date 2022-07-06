import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import registrationSchema from '../schemas/registrationSchema'

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

  const { email, password } = data

  // Hash password
  // create salt
  const salt = await bcrypt.genSalt(10)
  // generate hashed password with salt (password = entered password, from request body)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create User
  const user = await User.create({
    email,
    password: hashedPassword,
  })
  // back user information on response
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    })
  }
})

// @desc Authenticate a user
// @route POST /login
// @access Public
export const login = asyncHandler(async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body

  // check for user email
  const user = await User.findOne({ email })
  // check if user is already in database and password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    // back user information on response
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc Authenticate a user
// @route GET /user
// @access Public
export const getUser = asyncHandler(async (req, res) => {
  // get user data (from the middleware) on response
  const { _id, email } = req.user
  res.status(200).json({ _id, email })
})
