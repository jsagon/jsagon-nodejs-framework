export enum RouteAlias {
    Middlewares = 'middlewares',
    SkipMiddlewares = 'skipMiddlewares',
    UriBase = 'uriBase'
}

export type IRoute = {
    httpMethod: string,
    uri: string,
    middlewares: Function[],
    action: Function
}

export type MiddlewareType = string | Function

export type ControllerType = any

export type RouteRouteBuilder = {
  typeRequest: string,
  uri: string,
  middlewares: MiddlewareType[],
  skipMiddlewares: string[],
  action: string,
  Controller: ControllerType,
  rest: boolean
}

export enum Actions {
  Index = 'index',
  Edit = 'edit',
  List = 'list',
  Show = 'show',
  Create = 'create',
  Store = 'store',
  Detail = 'detail',
  Update = 'update'
}

export type ParamRouteBuilder = {
  uri?: string | null
  action?: string | null
}
