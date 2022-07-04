import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

/* Generate JWT */
const generateToken = (id) =>
  // it takes 3 argument. 1 payload, passed in {id}. 2 secret. 3 expires in
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

// @desc Register new user
// @route POST /register
// @access Public
export const register = asyncHandler(async (req, res) => {
  // Extract name, email and password from request body
  const { email, password } = req.body
  // if one of them is not in request body, trow error
  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exist
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }

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
  } else {
    res.status(400)
    throw new Error('Invalid user data')
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
  res.status(200).json({ message: 'Get user data' })
})
