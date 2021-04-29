import ejs from 'ejs'
import expressLayouts from 'express-ejs-layouts'

class ViewEngine {
    private viewEngine

    public configureApp (app, viewPath) {
      app.set('views', viewPath)
      app.set('layout', 'layouts/main');
      app.engine('ejs', ejs.__express)
      app.use(expressLayouts)
      app.set('view engine', 'ejs')
    }

    public getEngine () {
      return this.viewEngine
    }
}

module.exports = ViewEngine
