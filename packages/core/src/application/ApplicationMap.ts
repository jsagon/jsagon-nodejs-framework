import { CONFIG_APP_FILE_NAME } from '../config/AppConfigInterface'
import fs from 'fs'
import path from 'path'
import { MappedModule } from './module/ModuleLib'
import { ModuleFinder } from './module/ModuleFinder'
import { RouteFinder } from '../route/register/RouteFinder'

export type MappedApp = {
    uri?: string,
    layout?: string,
    httpKernel?: any,
    modules?: MappedModule[],
    routes?: any[]
}

export class ApplicationMap {
    private appFolderPath: string
    private mono: Boolean

    private configAppName = CONFIG_APP_FILE_NAME

    private moduleFinder: ModuleFinder
    private routeFinder: RouteFinder

    public constructor (folderPath: string, mono: Boolean) {
      this.appFolderPath = folderPath
      this.mono = mono
      this.moduleFinder = new ModuleFinder()
      this.routeFinder = new RouteFinder()
    }

    /**
     * Find every Module file to dinamically registration based on path convention
     *
     * @returns
     */
    public mapApplication (): Array<MappedApp> {
      return this.mono ? this.findOnMonoApp() : this.findOnMultApp()
    }

    private findOnMonoApp (): MappedApp[] {
      const apps: MappedApp[] = []
      const appConfig = this.require(this.appFolderPath, this.configAppName)

      apps.push({
        uri: appConfig.uri,
        layout: appConfig.layout,
        httpKernel: appConfig.httpKernel,
        modules: this.moduleFinder.find(this.appFolderPath),
        routes: this.routeFinder.find(this.appFolderPath)
      })

      return apps
    }

    private findOnMultApp (): MappedApp[] {
      const apps: MappedApp[] = []
      const dirApps = this.readDirs(this.appFolderPath)

      for (const dirApp of dirApps) {
        // Full directory path
        const appFullPath = path.join(this.appFolderPath, dirApp)

        // Load the configuration of the current application
        const appConfig = this.require(appFullPath, this.configAppName)
        if (!appConfig || !appConfig.enabled) continue

        apps.push({
          uri: appConfig.uri,
          layout: appConfig.layout,
          httpKernel: appConfig.httpKernel,
          modules: this.moduleFinder.find(appFullPath, dirApp),
          routes: this.routeFinder.find(appFullPath)
        })
      }

      return apps
    }

    private readDirs (...params) {
      return fs.readdirSync(path.join(...params))
    }

    private require (...params) {
      const pathModule = path.join(...params)
      try {
        return require(pathModule)
      } catch (e) {
        console.warn('Warning', e.code, pathModule)
        return null
      }
    }

    public setAppFolderPath (path: string): void {
      this.appFolderPath = path
    }
}
