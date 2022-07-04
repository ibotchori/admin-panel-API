// @desc Register new user
// @route POST /register
// @access Public
export const register = (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text')
  }
  res.status(200).json(req.body)
}

// @desc Authenticate a user
// @route POST /login
// @access Public
export const login = (req, res) => {
  res.status(200).json({ message: 'Login' })
}
