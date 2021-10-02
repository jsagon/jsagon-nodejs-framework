import { MODULES_FOLDER_NAME, CONFIG_MODULE_FILE_NAME } from '../../config/AppConfigInterface'

import { MappedModule } from './ModuleLib'
import { FinderBase } from '../base/FinderBase'
import { ModuleBase } from '../module/ModuleBase'

export class ModuleFinder extends FinderBase <MappedModule> {
  private folderModulesName = MODULES_FOLDER_NAME
  private moduleFileName = CONFIG_MODULE_FILE_NAME

  public find (appFolderFullPath: string, dirApp: string = ''): MappedModule[] {
    const dirModulesApp = this.readDirs(appFolderFullPath, this.folderModulesName)
    const modules: MappedModule[] = []

    let module: ModuleBase | null
    dirModulesApp.forEach(moduleName => {
      module = this.loadModule(appFolderFullPath, moduleName)
      if (!module) return

      modules.push({
        path: this.concatPath(dirApp, this.folderModulesName, moduleName),
        module
      })
    })

    return modules
  }

  private loadModule (appFolderFullPath: string, moduleName: string): ModuleBase {
    const module = this.require(appFolderFullPath, this.folderModulesName, moduleName, this.moduleFileName)
    return module ? module.default || module : null
  }
}
