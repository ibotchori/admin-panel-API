/* Custom error handler */
// Overwrite default express error handler
export const errorHandler = (err, req, res, next) => {
  // if status code is set, take that. if not, set it to 500
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)
  res.json({
    message: err.message,
    // stack gives some additional information. show the stack information only in developer mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
