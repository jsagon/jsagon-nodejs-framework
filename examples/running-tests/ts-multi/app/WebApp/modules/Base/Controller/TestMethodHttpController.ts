import { Controller, ControllerBase, Delete, Get, Patch, Post, Put, Request, Response } from '@jsagon/core'

@Controller('/method')
class TestMethodHttpController extends ControllerBase {
  @Get('/get')
  public async getMethod (req: Request, res: Response) {
    const { data } = req.query
    return res.json({ data })
  }

  @Post('/post')
  public async postMethod (req: Request, res: Response) {
    const { data } = req.body
    return res.status(201).json({ data })
  }

  @Put('/put/:id')
  public async putMethod (req: Request, res: Response) {
    const { data } = req.body
    const { id } = req.params
    return res.json({ data, id })
  }

  @Patch('/patch/:id')
  public async patchMethod (req: Request, res: Response) {
    const { data } = req.body
    const { id } = req.params
    return res.json({ data, id })
  }

  @Delete('/delete/:id')
  public async deleteMethod (req: Request, res: Response) {
    const { data } = req.body
    return res.status(204).json({ data })
  }
}

export default TestMethodHttpController
