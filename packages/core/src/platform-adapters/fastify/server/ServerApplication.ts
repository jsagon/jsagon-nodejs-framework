import ServerApplicationAbstract from '../../../application/server/abstract/ServerApplicationAbstract'

class FastifyServerApplication extends ServerApplicationAbstract {
  protected instanciateServer (): void {
    throw new Error('Fastify not supported yet')
  }

  protected configure (): void {
  }

  public setStaticDirPath (path: string): void {
  }
}

module.exports = FastifyServerApplication
