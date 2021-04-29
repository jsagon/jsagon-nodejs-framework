import RouteRegister from '../../../../route/register/abstract/RouteRegisterAbstract'

class ExpressRouteRegister extends RouteRegister {
  public registerRoute (route, localMiddlewares): void {
    const mid = localMiddlewares || []
    this.app[route.typeRequest](route.uri, [...mid, ...route.middlewares], route.action)
  }

  protected addMiddleware (middleware): void {
    this.app.use(middleware)
  }
}

module.exports = ExpressRouteRegister
