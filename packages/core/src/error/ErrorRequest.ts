import { Request, Response } from '../application/server/Interface/IApplication'

class ErrorRequest {
  handle (isRest: boolean, request: Request, response: Response, error) {
    response.status(500)
    if (isRest || /application\/json/.test(response.get('accept'))) {
      return response.send({ error: error.message, stack: error.stack })
    } else {
      return response.render('default/error', { error })
    }
  }
}

export default ErrorRequest
