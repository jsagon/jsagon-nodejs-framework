import { Controller, ControllerBase, Get, Middleware, Request, Response } from '@jsagon/core'

@Controller('/middleware')
class TestMiddlewareController extends ControllerBase {
  @Get('/globalmiddleware')
  public async getMethod (req: Request, res: Response) {
    // just for test
    return res.json({ global: req.body.GlobalMiddleware })
  }

  @Get('/not/globalmiddleware')
  @Middleware([], ['global'])
  public async notMethod (req: Request, res: Response) {
    // just for test
    return res.json({ global: req.body.GlobalMiddleware })
  }
}

export default TestMiddlewareController
