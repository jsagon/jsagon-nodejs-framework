import IServerApplication from './server/Interface/IServerApplication'

class ApplicationFactory {
  public static get (engine: string): IServerApplication {
    const pathEngine = this.exists(engine)
    return new (require(pathEngine))()
  }

  /**
   * Check if platform engine is available
   * @param engine
   * @returns
   */
  public static exists (engine: string): string {
    const pathEngine = `../platform-adapters/${engine}/server/ServerApplication`
    try {
      require.resolve(pathEngine)
      return pathEngine
    } catch (e) {
      throw new Error('Platform Engine not found')
    }
  }
}

export default ApplicationFactory
