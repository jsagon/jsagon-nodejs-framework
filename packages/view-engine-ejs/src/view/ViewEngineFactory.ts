class ViewEngineFactory {
  public static get (serverEngine: string) {
    const pathEngine = this.exists(serverEngine)
    return new (require(pathEngine))()
  }

  public static exists (serverEngine) {
    const pathEngine = `./${serverEngine}/ViewEngine`
    
    try {
      require.resolve(pathEngine)
      return pathEngine
    } catch (e) {
      throw new Error(`View Engine Handlebars not found for ${serverEngine}`)
    }
  }
}

export { ViewEngineFactory }
