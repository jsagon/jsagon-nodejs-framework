module.exports = (req, res, next) => {
  console.log("Hello, I'm an app middleware. You can edit me in /app/Website/http.")
  next()
}
