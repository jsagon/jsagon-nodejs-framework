import fs from 'fs'
import path from 'path'

export abstract class FinderBase <T> {
    public abstract find(appFolderFullPath: string, dirApp: string): T[];

    protected readDirs (...params) {
      return fs.readdirSync(path.join(...params))
    }

    protected require (...params) {
      const pathModule = this.concatPath(...params)

      try {
        return require(pathModule)
      } catch (e) {
        this.warn('Warning', e.code || e.message, pathModule)
        return null
      }
    }

    protected concatPath (...params): string {
      return path.join(...params)
    }

    protected warn (...e) {
      console.warn(...e)
    }
}
