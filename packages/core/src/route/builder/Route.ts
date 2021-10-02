import RouterBuilder from './RouterBuilder'
import RestRouterBuilder from './RestRouterBuilder'
import { ControllerType, MiddlewareType } from './RouteLib'

const Route = function (uriBase ?: string, controllerBase ?: ControllerType, middlewaresBase ?: MiddlewareType | MiddlewareType[]): RouterBuilder {
  return new RouterBuilder(uriBase, controllerBase, middlewaresBase)
}

const RestRoute = function (uriBase ?: string, controllerBase ?: ControllerType, middlewaresBase ?: MiddlewareType | MiddlewareType[]): RouterBuilder {
  return new RestRouterBuilder(uriBase, controllerBase, middlewaresBase)
}

export { Route, RestRoute }
