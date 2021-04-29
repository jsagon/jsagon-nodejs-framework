class ViewFactory {
  public static get (serverEngine: string, engine: string) {
    const pathEngine = this.exists(serverEngine, engine)
    return new (require(pathEngine))()
  }

  public static exists (serverEngine, engine) {
    const pathEngine = `../platform-adapters/${serverEngine}/view/view-adapters/${engine}/ViewEngine`

    try {
      require.resolve(pathEngine)
      return pathEngine
    } catch (e) {
      throw new Error('View Engine ' + engine + ' not found')
    }
  }
}

export default ViewFactory
