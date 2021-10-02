const { JSagon } = require('@jsagon/core')
const { ViewEngineFactory } = require('@jsagon/view-engine-ejs')
const configApp = require('./config/app.config')

JSagon.create(configApp, ViewEngineFactory).listen(3000, () => {
  console.log('Server online!')
})
