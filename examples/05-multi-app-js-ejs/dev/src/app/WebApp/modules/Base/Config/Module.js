const { ModuleBase } = require('@jsagon/core')
const HomeController = require('../Controller/HomeController')

class Module extends ModuleBase {
  static controllers = [
    HomeController
  ]
}

module.exports = Module
