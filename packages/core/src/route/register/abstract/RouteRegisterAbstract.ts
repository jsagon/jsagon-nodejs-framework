import path from 'path'
import ErrorRequest from '../../../error/ErrorRequest'
import RouterBuilder from '../../builder/RouterBuilder'
import IRouter from '../interface/IRouter'
import { IKernelMiddleware } from '../../../config/KernelConfigInterface'
import { AbstractController } from '../../../controller'
import { StringHelper } from '../../../utils'
import { Application, Request, Response } from '../../../application'

abstract class RouteRegisterAbstract {
    protected app: Application

    protected errorRequest: ErrorRequest

    protected routeBuilders: Array<RouterBuilder> = []
    protected routesMapped: Array<any> = []
    protected router: IRouter
    protected middlewares: IKernelMiddleware

    protected appPath: string
    protected viewAppDirName: string

    /**
     * @deprecated
     * @param router
     */
    public setRouter (router: IRouter) {
      this.router = router
    }

    public setApp (app) {
      this.app = app
    }

    public setRouteBuilders (routeBuilders: Array<RouterBuilder>) {
      this.routeBuilders = routeBuilders
    }

    public setGlobalMiddlewares (middlewares: IKernelMiddleware) {
      this.middlewares = middlewares
    }

    public setRoutesRegistered (routes: Array<any>) {
      this.routesMapped = routes
    }

    public setAppPath (f: string): void {
      this.appPath = f
    }

    public setViewAppDirName (f: string): void {
      this.viewAppDirName = f
    }

    public setErrorRequest (errorRequest: ErrorRequest): void {
      this.errorRequest = errorRequest
    }

    public registerGlobalMiddlewaresBefore (): void {
      if (!this.middlewares?.before) return

      this.middlewares.before.forEach(mid => {
        this.addMiddleware(mid)
      })
    }

    public registerGlobalMiddlewaresAfter (): void {
      if (!this.middlewares?.after) return

      this.middlewares.after.forEach((mid) => {
        this.addMiddleware(mid)
      })
    }

    public register () {
      // Routes mapped
      this.routesMapped.forEach(routeMapped => {
        const localMiddlewares = routeMapped.httpKernel?.middlewares

        routeMapped.routeBuilders.forEach((routeBuilder: RouterBuilder) => {
          const modulePath = routeBuilder.getModulePath()
          const rest = routeBuilder.isRest()

          routeBuilder.getRoutes().forEach(route => {
            route.action = this.mountRequestAction(route, localMiddlewares?.after, rest, routeMapped.layout, modulePath)
            route.uri = routeMapped.uriApp + route.uri

            this.registerRoute(route, localMiddlewares?.before)
          })
        })
      })
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
    protected mountRequestAction ({ Controller, action }, localMiddlewareAfter, rest, layout?: string, modulePath?: string) {
      let viewPath = null
      if (!rest) viewPath = this.generateViewPath(Controller, action, modulePath)

      return async (req: Request, res: Response, next) => {
        try {
          const controllerInstance = (new Controller()) as AbstractController

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
      if (localMiddlewareAfter) {
        localMiddlewareAfter.forEach((mid) => mid(...params))
      }

      if (!this.middlewares?.after) return

      this.middlewares.after.forEach((mid) => {
        mid(...params)
      })
    }

    protected abstract registerRoute (route, localMiddlewares): void

    protected abstract addMiddleware (middleware): void

    /**
     * Generate de default view path based on Controller and Action
     *
     * @param Controller
     * @param action
     * @param modulePath
     * @returns
     */
    private generateViewPath (Controller, action: string, modulePath: string): string {
      let viewDir = this.viewAppDirName + path.sep

      if (modulePath) {
        const newDir = modulePath.replace(this.appPath + path.sep, '')
        viewDir += newDir.replace(/modules(\\|\/)/g, '') + path.sep
      }
      viewDir += Controller.name.replace(/Controller/g, '') + path.sep + action

      return StringHelper.camelCaseToDash(viewDir)
    }
}

export default RouteRegisterAbstract
