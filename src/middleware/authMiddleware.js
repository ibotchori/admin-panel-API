/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'

/* Middleware for protect routes */
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token

  // Checking authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token (with out password) and assign it to request
      req.user = await User.findById(decoded.id).select('-password')

      // call the next peace of middleware
      if (decoded) {
        next()
      }
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  }
  // If no token at all
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export default authMiddleware
