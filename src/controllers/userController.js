// @desc Register new user
// @route POST /register
// @access Public
export const register = (req, res) => {
  res.status(200).json({ message: 'Register user' })
}

// @desc Authenticate a user
// @route POST /login
// @access Public
export const login = (req, res) => {
  res.status(200).json({ message: 'Login' })
}
