const { Route } = require('@jsagon/core')
const HomeController = require('../Controller/HomeController')

const route = Route('/', HomeController)
  .index()

module.exports = route
