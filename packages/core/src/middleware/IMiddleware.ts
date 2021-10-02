import { Request, Response } from '../application'

export interface IMiddleware {
    handle(req: Request, res: Response, next: Function)
}
