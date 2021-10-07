import { JSagon } from '@jsagon/core'
import configApp from './config/app.config'

const bootstrap = JSagon.create(configApp)
const app = bootstrap.getApplication().getApp()

export { app, bootstrap }
