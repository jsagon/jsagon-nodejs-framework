import { Controller, ControllerBase, Get, Request, Response } from '@jsagon/core'

@Controller()
class HomeController extends ControllerBase {
  @Get()
  public async index (req: Request, res: Response) {
    return this.render()
  }
}

export default HomeController
