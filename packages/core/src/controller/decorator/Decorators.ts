import { RouteBinder, ControllerMetadataReflection, ControllerMetadata } from './ControllerMetadataReflection'
import { RouteAlias } from '../../route/builder/RouteLib'
import { HTTPMethod } from '../../utils'

export const Get = RouteBinder(HTTPMethod.Get)
export const Post = RouteBinder(HTTPMethod.Post)
export const Delete = RouteBinder(HTTPMethod.Delete)
export const Put = RouteBinder(HTTPMethod.Put)
export const Patch = RouteBinder(HTTPMethod.Patch)

export const Controller = (uri: string = ''): Function => {
  return (target: Function): void => {
    ControllerMetadataReflection.setControllerMetadata(target.prototype, RouteAlias.UriBase, uri)
  }
}

export const View = (view: string, fullPath: boolean = false): Function => {
  return (target: ControllerMetadata, action: string): void => {
    ControllerMetadataReflection.setActionMetadata(target, action, { view: { view, fullPath } })
  }
}

export const Middleware = (middleware: string | string[] | {} | {}[], skipMiddleware?: string | string[]): Function => {
  return (target: ControllerMetadata, action: string): void => {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware]
    const skipMiddlewares = Array.isArray(skipMiddleware) ? skipMiddleware : [skipMiddleware]

    // controller
    if (target instanceof Function) {
      const { prototype } = target
      ControllerMetadataReflection.setControllerMetadata(prototype, RouteAlias.Middlewares, middlewares)
      ControllerMetadataReflection.setControllerMetadata(prototype, RouteAlias.SkipMiddlewares, skipMiddlewares)
      return
    }

    // action target
    ControllerMetadataReflection.setActionMetadata(target, action, { middlewares, skipMiddlewares })
  }
}
