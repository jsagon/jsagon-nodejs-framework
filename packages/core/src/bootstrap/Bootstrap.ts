import { ViewEngineFactory as ViewEngineFactoryDefault } from '@jsagon/view-engine-hbs'
import ServerApplicationAbstract from '../application/server/abstract/ServerApplicationAbstract'
import RouteRegisterFactory from '../route/register/RouteRegisterFactory'
import RouteRegisterAbstract from '../route/register/abstract/RouteRegisterAbstract'
import AppConfigInterface, { configDefault } from '../config/AppConfigInterface'
import ApplicationFactory from '../application/ApplicationFactory'
import { ViewEngineInterface } from '../view/ViewEngineInterface'
import Error404 from '../error/Error404'
import ErrorRequest from '../error/ErrorRequest'
import { ApplicationMap } from '../application/ApplicationMap'

class Bootstrap {
    private application: ServerApplicationAbstract
    private config: AppConfigInterface
    private serverEngine: string

    private applicationMap: ApplicationMap
    private routeRegister: RouteRegisterAbstract

    private errorRequest: ErrorRequest

    protected ViewEngineFactory: any
    protected viewEngineName: string
    protected viewEngine

    constructor (configApp: AppConfigInterface = {}, ViewEngineFactory?: ViewEngineInterface) {
      this.config = { ...configDefault(configApp.root), ...configApp }

      this.ViewEngineFactory = ViewEngineFactory

      this.serverEngine = this.config.server
      this.application = ApplicationFactory.get(this.serverEngine) as ServerApplicationAbstract

      this.initializeDefault()
      this.initializeViewEngine()
      this.initializeRouteHelpers()
    }

    public initializeDefault (): void {
      this.application.setStaticDirPath(this.config.publicPath)
    }

    protected initializeViewEngine (): void {
      const viewFactory = this.ViewEngineFactory || ViewEngineFactoryDefault

      this.viewEngine = viewFactory.get(this.serverEngine)
      this.viewEngine.configureApp(this.application.getApp(), this.config.viewPath)
    }

    protected initializeRouteHelpers (): void {
      this.errorRequest = new ErrorRequest()

      this.routeRegister = RouteRegisterFactory.get(this.serverEngine)
      this.routeRegister.setErrorRequest(this.errorRequest)

      this.routeRegister.setGlobalMiddlewares(this.config.httpKernel.globalMiddlewares)
      this.routeRegister.setAppPath(this.config.appPath)
      this.routeRegister.setViewAppDirName(this.config.viewAppDirName)

      this.applicationMap = new ApplicationMap(this.config.appPath, this.config.monoApplication)
    }

    public registerRoutes (): void {
      this.routeRegister.setApp(this.application.getApp())
      this.routeRegister.setMappedApp(this.applicationMap.mapApplication())

      // @todo remover console log
      // console.log(util.inspect(this.applicationMap.mapApplication(), { showHidden: false, depth: null, colors: true }))
      this.routeRegister.register()
    }

    public getViewEngine () {
      return this.viewEngine
    }

    public getApplication (): ServerApplicationAbstract {
      return this.application
    }

    public initialize (): void {
      this.registerRoutes()
      this.handleError404()
    }

    public listen (port: number|string, closure?: () => void) {
      this.initialize()
      return this.application.getApp().listen(port, closure)
    }

    private handleError404 (): void {
      this.application.getApp().use(Error404.index)
    }
}

class JSagon {
  public static create (configApp, viewEngineFactory?: ViewEngineInterface): Bootstrap {
    return new Bootstrap(configApp, viewEngineFactory)
  }
}

export { JSagon, Bootstrap }
