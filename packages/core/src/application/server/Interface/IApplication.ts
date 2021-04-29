import { Application as IApplication, Request as IRequest, Response as IResponse } from 'express'

interface Application extends IApplication {
  // The interface will be replaced for a generic implementation when launched another platform http
}

interface Request extends IRequest {

}

interface Response extends IResponse {

}

export { Application, Request, Response }
