import express from 'express'
import ServerApplicationAbstract from '../../../application/server/abstract/ServerApplicationAbstract'

class ExpressServerApplication extends ServerApplicationAbstract {
  protected instanciateServer (): void {
    this.app = express()
  }

  protected configure (): void {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  public setStaticDirPath (path: string): void {
    this.app.use('/public', express.static(path))
  }
}

module.exports = ExpressServerApplication
