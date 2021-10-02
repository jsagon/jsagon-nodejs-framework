import { IRoute } from '../../../../route/builder/RouteLib'
import RouteRegister from '../../../../route/register/abstract/RouteRegisterAbstract'

class ExpressRouteRegister extends RouteRegister {
  public registerRoute (route: IRoute): void {
    this.app[route.httpMethod](route.uri, route.middlewares, route.action)
  }

  protected addMiddleware (middleware): void {
    this.app.use(middleware)
  }
}

module.exports = ExpressRouteRegister
