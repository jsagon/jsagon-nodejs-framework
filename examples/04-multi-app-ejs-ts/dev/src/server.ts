import { JSagon } from '@jsagon/core'
import { ViewEngineFactory } from '@jsagon/view-engine-ejs'
import configApp from './config/app.config'

JSagon.create(configApp, ViewEngineFactory).listen(3000, () => {
  console.log('Server online!')
})
