import pathTool from 'path'
import ErrorRequest from '../../../error/ErrorRequest'
import RouterBuilder from '../../builder/RouterBuilder'
import IRouter from '../interface/IRouter'
import { IKernelMiddleware } from '../../../config/KernelConfigInterface'
import { ControllerBase } from '../../../controller'
import { StringHelper } from '../../../utils'
import { Application, Request, Response } from '../../../application'
import { MappedApp } from '../../../application/ApplicationMap'
import { ControllerMetadataReflection } from '../../../controller/decorator/ControllerMetadataReflection'
import { ControllerType, MiddlewareType } from '../../builder/RouteLib'

abstract class RouteRegisterAbstract {
    protected app: Application

    protected errorRequest: ErrorRequest

    protected routeBuilders: Array<RouterBuilder> = []
    protected router: IRouter
    protected globalMiddlewares: IKernelMiddleware

    protected appPath: string
    protected viewAppDirName: string
    protected appMapped: MappedApp[]

    private currentAppMiddlewaresRegistered: {}

    public setRouter (router: IRouter): void {
      this.router = router
    }

    public setApp (app): void {
      this.app = app
    }

    public setMappedApp (mappedApp: MappedApp[]): void {
      this.appMapped = mappedApp
    }

    public setRouteBuilders (routeBuilders: Array<RouterBuilder>): void {
      this.routeBuilders = routeBuilders
    }

    public setGlobalMiddlewares (middlewares: IKernelMiddleware): void {
      this.globalMiddlewares = middlewares
    }

    public setAppPath (path: string): void {
      this.appPath = path
    }

    public setViewAppDirName (f: string): void {
      this.viewAppDirName = f
    }

    public setErrorRequest (errorRequest: ErrorRequest): void {
      this.errorRequest = errorRequest
    }

    public register (): void {
      const { registered: middlewaresGlobalRegistered } = this.globalMiddlewares

      this.appMapped.forEach(currentApp => {
        const { registered: middlewaresAppRegistered } = currentApp.httpKernel?.middlewares || {}
        this.currentAppMiddlewaresRegistered = Object.assign(middlewaresGlobalRegistered || {}, middlewaresAppRegistered || {})

        this.registerByRoutes(currentApp)
        this.registerByDecorator(currentApp)
      })
    }

    private registerByRoutes (currentApp: MappedApp): void {
      const { uri: uriApp, httpKernel, layout, routes } = currentApp
      const { before: middlewaresBefore, after: middlewaresAfter } = httpKernel?.middlewares || {}

      let actionController: Function
      let modulePath: string
      let rest: boolean

      routes.forEach((routeBuilder: RouterBuilder) => {
        modulePath = routeBuilder.getModulePath()
        rest = routeBuilder.isRest()

        routeBuilder.getRoutes().forEach(route => {
          const { Controller, action } = route
          actionController = this.mountRequestAction({ Controller, action }, middlewaresAfter, rest, layout, modulePath)

          this.registerRoute({
            httpMethod: route.typeRequest,
            uri: uriApp + route.uri,
            middlewares: this.getMiddlewaresAction(middlewaresBefore, route.middlewares, route.skipMiddlewares),
            action: actionController
          })
        })
      })
    }

    private registerByDecorator (currentApp: MappedApp): void {
      const { uri: uriApp, httpKernel, layout, modules } = currentApp
      const { before: middlewaresBefore, after: middlewaresAfter } = httpKernel?.middlewares || {}

      let modulePathFull: string
      modules.forEach(({ module, path }) => {
        modulePathFull = pathTool.join(this.appPath, path)

        module.controllers.forEach(controller => {
          const metadata = ControllerMetadataReflection.getMetadataRoute(controller.prototype)

          const { actions, uriBase: uriController } = metadata

          Object.keys(actions).forEach(actionName => {
            const { httpMethod, uri: uriAction, middlewares, skipMiddlewares, view } = actions[actionName]
            const { view: viewName, fullPath: viewFullPath } = view || {}
            const action = this.mountRequestAction({ Controller: controller, action: actionName, viewName, viewFullPath }, middlewaresAfter, false, layout, modulePathFull)

            this.registerRoute({
              httpMethod,
              uri: uriApp + uriController + uriAction,
              middlewares: this.getMiddlewaresAction(middlewaresBefore, middlewares, skipMiddlewares),
              action
            })
          })
        })
      })
    }

    private getMiddlewaresAction (middlewaresApp: MiddlewareType[], middlewaresAction: MiddlewareType[], skipMiddlewares: string[]): Function[] {
      const { before: middlewaresGlobal } = this.globalMiddlewares
      const middlewaresListed = [...(middlewaresGlobal || []), ...(middlewaresAction || []), ...(middlewaresApp || [])]

      if (!middlewaresListed || middlewaresListed.length <= 0) return []

      const middlewares: Function[] = []
      let handle: Function

      middlewaresListed.forEach(middleware => {
        if (typeof middleware !== 'string') return middlewares.push(middleware)
        if (this.mustSkipMiddleware(middleware, skipMiddlewares)) return

        handle = this.currentAppMiddlewaresRegistered[middleware]
        if (handle) middlewares.push(handle)
      })

      return middlewares
    }

    private mustSkipMiddleware (middlewareAlias: string, skipMiddlewares: string[] = []): boolean {
      return skipMiddlewares.some(alias => alias === middlewareAlias)
    }

    /**
     * Create the request action based on Controller and Action
     *
     * @param param0
     * @param localMiddlewareAfter
     * @param rest
     * @param modulePath
     * @returns
     */
    protected mountRequestAction ({ Controller, action, viewName, viewFullPath }: {Controller: ControllerType, action: string, viewName?: string|null, viewFullPath?: boolean|null}, localMiddlewareAfter, rest, layout?: string, modulePath?: string) {
      let viewPath = null

      if (!rest) viewPath = this.generateViewPath(Controller, action, modulePath, viewName, viewFullPath)

      return async (req: Request, res: Response, next) => {
        try {
          const controllerInstance = (new Controller()) as ControllerBase

          // Check if the controller has the action method
          if (!controllerInstance[action]) throw new Error(`Method not found: ${action}`)

          controllerInstance.setRequest(req)
          controllerInstance.setResponse(res)

          if (!rest) {
            controllerInstance.setViewPath(viewPath)
            controllerInstance.setLayout(layout)
          }

          // Execute the action method requested
          await controllerInstance[action](req, res, next)
        } catch (e) {
          return this.errorRequest.handle(rest, req, res, e)
        }

        this.executeMiddlewareAfter([req, res, next], localMiddlewareAfter)
      }
    }

    /**
     * Middlewares to be executed after the action has finished
     * @param params
     * @param localMiddlewareAfter
     * @returns
     */
    private async executeMiddlewareAfter (params, localMiddlewareAfter): Promise<void> {
      const middlewares = [...(this.globalMiddlewares?.after || []), ...(localMiddlewareAfter || [])]
      let handle: Function

      middlewares.forEach(middleware => {
        if (typeof middleware !== 'string') return middleware(...params)

        handle = this.currentAppMiddlewaresRegistered[middleware]
        if (handle) handle(...params)
      })
    }

    protected abstract registerRoute (route): void

    protected abstract addMiddleware (middleware): void

    /**
     * Generate de default view path based on Controller and Action
     *
     * @param Controller
     * @param action
     * @param modulePath
     * @returns
     */
    private generateViewPath (Controller, action: string, modulePath: string, viewName?: string, viewFullPath?: boolean): string {
      let viewDir = this.viewAppDirName + pathTool.sep
      if (viewFullPath) return viewDir + viewName

      if (modulePath) {
        const newDir = modulePath.replace(this.appPath + pathTool.sep, '')
        viewDir += newDir.replace(/modules(\\|\/)/g, '') + pathTool.sep
      }
      viewDir += Controller.name.replace(/Controller/g, '') + pathTool.sep + (viewName || action)

      return StringHelper.camelCaseToDash(viewDir)
    }
}

export default RouteRegisterAbstract
