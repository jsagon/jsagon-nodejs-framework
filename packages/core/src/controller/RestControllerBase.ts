import { Request, Response } from '../application'

export abstract class RestControllerBase {
    protected request: Request
    protected response: Response

    public setRequest (req: Request): void {
      this.request = req
    }

    public setResponse (res: Response): void {
      this.response = res
    }
}
