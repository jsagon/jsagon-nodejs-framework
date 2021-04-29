import IServerApplication from '../Interface/IServerApplication'
import { Application } from '../Interface/IApplication'

abstract class ServerApplicationAbstract implements IServerApplication {
    protected serverEngine: string
    protected app: Application

    constructor () {
      this.instanciateServer()
      this.configure()
    }

    public getApp (): Application {
      return this.app
    }

    protected abstract instanciateServer (): void
    protected abstract configure (): void
    public abstract setStaticDirPath (path: string): void
}

export default ServerApplicationAbstract
