import { HTTPMethod } from '../../utils'
import { Actions, ControllerType, MiddlewareType, ParamRouteBuilder, RouteRouteBuilder } from './RouteLib'

class RouterBuilder {
    protected rest = false

    private uriBase: string
    private ControllerBase: ControllerType
    private middlewaresBase: MiddlewareType[]
    private skipMiddlewares: string[]

    private modulePath: string

    private currentUri: string
    private currentAction: string

    private currentTypeRequest: string
    private currentTypeMethod: string

    private routes: RouteRouteBuilder[] = []

    constructor (uriBase ?: string, controllerBase ?: ControllerType, middlewaresBase ?: MiddlewareType | MiddlewareType[]) {
      if (uriBase) this.setBaseUri(uriBase)
      if (controllerBase) this.setBaseController(controllerBase)
      if (middlewaresBase) this.setBaseMiddleware(middlewaresBase)
    }

    public setBaseUri (uriBase: string): RouterBuilder {
      this.uriBase = uriBase
      return this
    }

    public setBaseController (controllerBase: ControllerType): RouterBuilder {
      this.ControllerBase = controllerBase
      return this
    }

    public setBaseMiddleware (middlewaresBase: MiddlewareType | MiddlewareType[]): RouterBuilder {
      this.middlewaresBase = Array.isArray(middlewaresBase) ? middlewaresBase : [middlewaresBase]
      return this
    }

    public setSkipMiddleware (middleware: string | string[]): RouterBuilder {
      this.skipMiddlewares = Array.isArray(middleware) ? middleware : [middleware]
      return this
    }

    public getSkipMiddleware (): string[] {
      return this.skipMiddlewares
    }

    public addBaseMiddleware (middlewareBase: MiddlewareType): RouterBuilder {
      this.middlewaresBase.push(middlewareBase)
      return this
    }

    public setModulePath (modulePath: string): RouterBuilder {
      this.modulePath = modulePath
      return this
    }

    public getModulePath (): string | null {
      return this.modulePath
    }

    public get (params = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Get, params)
      return this
    }

    public index (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Get, params, Actions.Index)
      return this
    }

    public list (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Get, params, Actions.List)
      return this
    }

    public show (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Get, params, Actions.Show)
      return this
    }

    public detail (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Get, params, Actions.Detail)
      return this
    }

    public create (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Get, params, Actions.Create)
      return this
    }

    public edit (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Post, params, Actions.Edit)
      return this
    }

    public post (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Post, params)
      return this
    }

    public store (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Post, params, Actions.Store)
      return this
    }

    public patch (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Path, params)
      return this
    }

    public put (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Put, params)
      return this
    }

    public del (params: ParamRouteBuilder = {}): RouterBuilder {
      this.registerRoute(HTTPMethod.Delete, params)
      return this
    }

    public allDefaults (): RouterBuilder {
      return this.index().list().create().store().edit().patch().detail().del()
    }

    public isRest (): boolean {
      return this.rest
    }

    private registerRoute (typeRequest: string, params: ParamRouteBuilder | null, typeMethod?: string | null): void {
      this.manageBase(params, typeRequest, typeMethod)

      const uri = this.generateUri()
      const action = this.generateAction()

      this.routes.push({
        typeRequest,
        uri,
        middlewares: Object.assign([], this.middlewaresBase),
        skipMiddlewares: this.skipMiddlewares || [],
        action,
        Controller: this.ControllerBase,
        rest: this.rest
      })
    }

    private manageBase ({ uri, action }: ParamRouteBuilder | null, typeRequest: string, typeMethod: string): void {
      this.currentUri = uri
      this.currentAction = action

      this.currentTypeRequest = typeRequest
      this.currentTypeMethod = typeMethod
    }

    private generateAction (): string {
      return this.currentAction || this.getDefaultAction(this.currentTypeMethod || this.currentTypeRequest)
    }

    private generateUri (): string {
      const uri = this.currentUri || this.getDefaultUri(this.currentTypeMethod || this.currentTypeRequest)
      return (this.uriBase === '/' ? '' : this.uriBase) + uri
    }

    protected getDefaultAction (action: string): string {
      switch (action) {
        case HTTPMethod.Get: return Actions.Index
        case HTTPMethod.Post: return ''
        case HTTPMethod.Path:
        case HTTPMethod.Put: return Actions.Update
        default: return action
      }
    }

    protected getDefaultUri (action: string): string {
      switch (action) {
        case HTTPMethod.Get:
        case Actions.Index: return ''
        case Actions.List: return '/list'
        case Actions.Create: return '/create'
        case Actions.Edit: return '/edit/:id'
        case Actions.Store:
        case HTTPMethod.Post: return '/store'
        case HTTPMethod.Put:
        case HTTPMethod.Path: return '/update/:id'
        case HTTPMethod.Delete: return '/delete/:id'
        case Actions.Detail: return '/detail/:id'
        case Actions.Show: return '/show/:id'
        default: return ''
      }
    }

    public getRoutes (): RouteRouteBuilder[] {
      return this.routes
    }
}

export default RouterBuilder
