import { Request, Response } from '../application'

export abstract class AbstractRestController {
    protected request: Request
    protected response: Response

    public setRequest (req: Request): void {
      this.request = req
    }

    public setResponse (res: Response): void {
      this.response = res
    }
}
