import RouterBuilder from './RouterBuilder'
import RestRouterBuilder from './RestRouterBuilder'

const Route = function (uriBase ?: string, controllerBase ?: any, middlewaresBase ?: any): RouterBuilder {
  return new RouterBuilder(uriBase, controllerBase, middlewaresBase)
}

const RestRoute = function (uriBase ?: string, controllerBase ?: any, middlewaresBase ?: any): RouterBuilder {
  return new RestRouterBuilder(uriBase, controllerBase, middlewaresBase)
}

export { Route, RestRoute }
