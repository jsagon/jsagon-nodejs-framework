import path from 'path'
import httpKernel from '../http/kernel'

const rootPath = path.join(__dirname, '../../')

export default {
  // The server engine/framework to be used
  // server: 'express',
  
  // Define the view engine
  // viewEngine: 'express-handlebars',
  
  // Define the project's structure as a single application - Define a estrutura do projeto como única aplicação
  monoApplication: false,
  
  // Applications' root path
  root: rootPath,

  // Applications path
  // appPath: path.join(rootPath, 'src/app'),
  
  // Where static files should be - Onde arquivos estáticos devem estar
  // publicPath: path.join(rootPath, 'public'),
  
  // Where view and sass should be - Onde arquivos da view e sass devem estar
  // resourcePath: path.join(rootPath, 'resource'), 
  
  // Specific view folder - Pasta específica das views da aplicação
  // viewPath: path.join(rootPath, 'resource/views'),
  
  // Name of the folder where the app's views should be in resource/views - Nome da pasta onde as views da aplicação devem estar
  // viewAppDirName: 'app',
  
  // Http config and functionalities
  httpKernel
}
