const { ControllerBase, Controller, Get } = require('@jsagon/core')

@Controller()
class HomeController extends ControllerBase {
  @Get()
  async index (req, res) {
    return this.render()
  }
}

module.exports = HomeController
