import { MODULES_FOLDER_NAME, CONFIG_ROUTE_FILE_NAME } from '../../config/AppConfigInterface'
import { FinderBase } from '../../application/base/FinderBase'
import { RouteRouteBuilder } from '../builder/RouteLib'

export class RouteFinder extends FinderBase <RouteRouteBuilder> {
  private folderModulesName = MODULES_FOLDER_NAME
  private routesFileName = CONFIG_ROUTE_FILE_NAME

  public find (appFolderFullPath: string): RouteRouteBuilder[] {
    const dirModulesApp = this.readDirs(appFolderFullPath, this.folderModulesName)
    const routes: RouteRouteBuilder[] = []

    dirModulesApp.forEach(module => {
      this.loadRouteBuilder(routes, appFolderFullPath, module)
    })

    return routes
  }

  private loadRouteBuilder (routeBuilders: RouteRouteBuilder[], appFullPath: string, module: string): void {
    let builders = this.require(appFullPath, this.folderModulesName, module, this.routesFileName)
    if (!builders) return

    builders = builders.default || builders
    if (!builders) return

    if (Array.isArray(builders)) {
      builders.forEach(builder => {
        builder.setModulePath(this.concatPath(appFullPath, this.folderModulesName, module))
        routeBuilders.push(builder)
      })
    } else {
      builders.setModulePath(this.concatPath(appFullPath, this.folderModulesName, module))
      routeBuilders.push(builders)
    }
  }

  protected warn () {}
}
