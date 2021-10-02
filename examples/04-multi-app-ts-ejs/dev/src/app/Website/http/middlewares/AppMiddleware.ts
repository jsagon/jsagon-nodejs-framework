import { Request, Response } from '@jsagon/core'

export const AppMiddleware = (req: Request, res: Response, next: Function): void => {
  console.log("Hello, I'm an app middleware. You can edit me in /app/Website/http.")
  next()
}
