class ConfigHelper {
  public static loadConfig (path: string) {
    return require(path)
  }
}

export default ConfigHelper
