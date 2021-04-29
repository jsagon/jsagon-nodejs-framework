import IParamBuilder from './interface/IParamBuilder'

class RouterBuilder {
    protected rest = false

    private uriBase: string
    private ControllerBase: any
    private middlewaresBase: Array<any>

    private modulePath: string

    private currentUri: string
    private currentAction: string

    private currentTypeRequest: string
    private currentTypeMethod: string

    private routes: Array<any> = []

    constructor (uriBase ?: string, controllerBase ?: any, middlewaresBase ?: any) {
      if (uriBase) this.setBaseUri(uriBase)
      if (controllerBase) this.setBaseController(controllerBase)
      if (middlewaresBase) this.setBaseMiddleware(middlewaresBase)
    }

    public setBaseUri (uriBase: string) {
      this.uriBase = uriBase
      return this
    }

    public setBaseController (controllerBase: any) {
      this.ControllerBase = controllerBase
      return this
    }

    public setBaseMiddleware (middlewaresBase: any) {
      this.middlewaresBase = Array.isArray(middlewaresBase) ? middlewaresBase : [middlewaresBase]
      return this
    }

    public addBaseMiddleware (middlewareBase: any) {
      this.middlewaresBase.push(middlewareBase)
      return this
    }

    public setModulePath (f: string): this {
      this.modulePath = f
      return this
    }

    public getModulePath (): string | null {
      return this.modulePath
    }

    public get (params = {}) {
      this.registerRoute('get', params)
      return this
    }

    public index (params = {}) {
      this.registerRoute('get', params, 'index')
      return this
    }

    public list (params = {}) {
      this.registerRoute('get', params, 'list')
      return this
    }

    public show (params = {}) {
      this.registerRoute('get', params, 'show')
      return this
    }

    public detail (params = {}) {
      this.registerRoute('get', params, 'detail')
      return this
    }

    public create (params = {}) {
      this.registerRoute('get', params, 'create')
      return this
    }

    public edit (params = {}) {
      this.registerRoute('post', params, 'edit')
      return this
    }

    public post (params = {}) {
      this.registerRoute('post', params)
      return this
    }

    public store (params = {}) {
      this.registerRoute('post', params, 'store')
      return this
    }

    public patch (params = {}) {
      this.registerRoute('patch', params)
      return this
    }

    public put (params = {}) {
      this.registerRoute('put', params)
      return this
    }

    public del (params = {}) {
      this.registerRoute('delete', params)
      return this
    }

    public allDefaults () {
      return this.index().list().create().store().edit().patch().detail().del()
    }

    public isRest (): Boolean {
      return this.rest
    }

    private registerRoute (typeRequest: string, params: IParamBuilder | null, typeMethod?: string | null) {
      this.manageBase(params, typeRequest, typeMethod)

      const uri = this.generateUri()
      const action = this.generateAction()

      this.routes.push({
        typeRequest,
        uri,
        middlewares: Object.assign([], this.middlewaresBase),
        action,
        Controller: this.ControllerBase,
        rest: this.rest
      })
    }

    private manageBase ({ uri, action }: IParamBuilder | null, typeRequest: string, typeMethod: string) {
      this.currentUri = uri
      this.currentAction = action

      this.currentTypeRequest = typeRequest
      this.currentTypeMethod = typeMethod
    }

    private generateAction () {
      return this.currentAction || this.getDefaultAction(this.currentTypeMethod || this.currentTypeRequest)
    }

    private generateUri () {
      const uri = this.currentUri || this.getDefaultUri(this.currentTypeMethod || this.currentTypeRequest)
      return (this.uriBase === '/' ? '' : this.uriBase) + uri
    }

    protected getDefaultAction (action: string) {
      switch (action) {
        case 'get': return 'index'
        case 'post': return ''
        case 'patch':
        case 'put': return 'update'
        default: return action
      }
    }

    protected getDefaultUri (action: string): string {
      switch (action) {
        case 'get':
        case 'index': return ''
        case 'list': return '/list'
        case 'create': return '/create'
        case 'edit': return '/edit/:id'
        case 'store':
        case 'post': return '/store'
        case 'put':
        case 'patch': return '/update/:id'
        case 'delete': return '/delete/:id'
        case 'detail': return '/detail/:id'
        case 'show': return '/show/:id'
        default: return ''
      }
    }

    public getRoutes () {
      return this.routes
    }
}

export default RouterBuilder
