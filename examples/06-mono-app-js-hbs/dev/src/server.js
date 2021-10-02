const { JSagon } = require('@jsagon/core')
const configApp = require('./config/app.config')

JSagon.create(configApp).listen(3000, () => {
  console.log('Server online!')
})
