import fs from 'fs'
import path from 'path'

class RouteFinder {
    private appFolderPath: string
    private mono: Boolean

    private folderModulesName = 'modules'
    private routesFileName = 'Config/Routes'
    private configAppName = 'app.config'

    public constructor (f:string, mono: Boolean) {
      this.appFolderPath = f
      this.mono = mono
    }

    /**
     * Find every Route file to dinamically registration based on path convention
     *
     * @returns
     */
    public find (): Array<any> {
      const routesRegistered = []

      if (this.mono) {
        // Load the configuration of the current application
        const appConfig = this.require(this.appFolderPath, this.configAppName)

        const dirModulesApp = this.readDirs(this.appFolderPath, this.folderModulesName)
        const routeBuilders = []
        dirModulesApp.forEach(module => this.loadRouteBuilder(routeBuilders, this.appFolderPath, module))

        routesRegistered.push({ uriApp: appConfig.uri, routeBuilders, httpKernel: appConfig.httpKernel })

        return routesRegistered
      }

      const dirApps = this.readDirs(this.appFolderPath)

      for (const dirApp of dirApps) {
        // Full directory path
        const appFullPath = path.join(this.appFolderPath, dirApp)

        // Load the configuration of the current application
        const appConfig = this.require(appFullPath, this.configAppName)
        if (!appConfig.enabled) continue

        const dirModulesApp = this.readDirs(appFullPath, this.folderModulesName)
        const routeBuilders = []
        dirModulesApp.forEach(module => this.loadRouteBuilder(routeBuilders, appFullPath, module))

        routesRegistered.push({ uriApp: appConfig.uri, routeBuilders, httpKernel: appConfig.httpKernel, layout: appConfig.layout })
      }

      return routesRegistered
    }

    private loadRouteBuilder (routeBuilders, appFullPath: string, module: string) {
      let builders = this.require(appFullPath, this.folderModulesName, module, this.routesFileName)
      builders = builders.default || builders
      if (!builders) return

      if (Array.isArray(builders)) {
        builders.forEach(builder => {
          builder.setModulePath(path.join(appFullPath, this.folderModulesName, module))
          routeBuilders.push(builder)
        })
      } else {
        builders.setModulePath(path.join(appFullPath, this.folderModulesName, module))
        routeBuilders.push(builders)
      }
    }

    private readDirs (...params) {
      return fs.readdirSync(path.join(...params))
    }

    private require (...params) {
      try {
        return require(path.join(...params))
      } catch (e) {
        console.log(e)
        return null
      }
    }

    public setAppFolderPath (path: string) {
      this.appFolderPath = path
    }
}

export default RouteFinder
