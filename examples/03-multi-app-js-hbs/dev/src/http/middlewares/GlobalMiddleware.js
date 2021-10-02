
module.exports = (req, res, next) => {
  console.log("Hi, I'm a global middleware. You can edit me in /src/http.")
  next()
}
