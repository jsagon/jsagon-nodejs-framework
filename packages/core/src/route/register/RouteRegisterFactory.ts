import RouteRegisterAbstract from './abstract/RouteRegisterAbstract'

class RouteRegisterFactory {
  public static get (engine: string | null = 'express'): RouteRegisterAbstract {
    const pathEngine = this.exists(engine)
    return new (require(pathEngine))()
  }

  public static exists (engine: string): string {
    const pathEngine = '../../platform-adapters/' + engine + '/route/register/ExpressRouteRegister'

    try {
      require.resolve(pathEngine)
      return pathEngine
    } catch (e) {
      throw new Error('Platform Engine Route Register not found')
    }
  }
}

export default RouteRegisterFactory
