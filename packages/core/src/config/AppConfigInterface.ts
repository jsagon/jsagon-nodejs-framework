import path from 'path'
import { KernelConfigInterface } from './KernelConfigInterface'

export default abstract class AppConfigInterface {
    server?: string | null
    viewEngine?: string | null
    monoApplication?: Boolean | null
    appPath?: string | null
    publicPath?: string | null
    resourcePath?: string | null
    viewPath?: string | null
    viewAppDirName?: string | null
    httpKernel?: KernelConfigInterface | null
    root?: string | null
}

export const configDefault = (rootPath: string) => {
  return {
    // The server engine/framework to be used
    server: 'express',
    // Define the view engine
    viewEngine: 'express-handlebars',
    // Define the project's structure as a single application - Define a estrutura do projeto como única aplicação
    monoApplication: true,
    // Applications path
    appPath: path.join(rootPath, 'src/app'),
    // Where static files should be - Onde arquivos estáticos devem estar
    publicPath: path.join(rootPath, 'public'),
    // Where view and sass should be - Onde arquivos da view e sass devem estar
    resourcePath: path.join(rootPath, 'resource'),
    // Specific view folder - Pasta específica das views da aplicação
    viewPath: path.join(rootPath, 'resource/views'),
    // Name of the folder where the app's views should be in resource/views - Nome da pasta onde as views da aplicação devem estar
    viewAppDirName: 'app'
  }
}

export const MODULES_FOLDER_NAME = 'modules'
export const CONFIG_MODULE_FILE_NAME = 'Config/Module'
export const CONFIG_ROUTE_FILE_NAME = 'Config/Routes'
export const CONFIG_APP_FILE_NAME = 'app.config'
