import { JSagon } from '@jsagon/core'
import configApp from './config/app.config'

JSagon.create(configApp).listen(3000, () => {
  console.log('Server online!')
})
