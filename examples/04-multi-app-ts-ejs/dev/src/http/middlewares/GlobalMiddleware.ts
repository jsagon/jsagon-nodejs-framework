import { Request, Response } from '@jsagon/core'

export const GlobalMiddleware = (req: Request, res: Response, next: Function): void => {
  console.log("Hi, I'm a global middleware. You can edit me in /src/http.")
  next()
}
