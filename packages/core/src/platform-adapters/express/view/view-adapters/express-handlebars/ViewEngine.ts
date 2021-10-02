import path from 'path'
import exphbs from 'express-handlebars'

class ViewEngine {
    private viewEngine

    public configureApp (app, viewPath): void {
      app.set('views', viewPath)

      this.viewEngine = exphbs.create({
        extname: '.hbs',
        partialsDir: [path.join(viewPath, 'layouts/partials')],
        helpers: {
          section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
          }
        }
      })

      app.engine('hbs', this.viewEngine.engine)
      app.set('view engine', 'hbs')
    }

    public getEngine (): any {
      return this.viewEngine
    }
}

module.exports = ViewEngine
