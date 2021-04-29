import RouterBuilder from './RouterBuilder'

class RestRouterBuilder extends RouterBuilder {
  protected rest = true

  public allDefaults () {
    return this.store().patch().del().show().edit().index()
  }

  protected getDefaultAction (action: string) {
    switch (action) {
      // case 'get': return 'index'
      case 'post': return ''
      case 'patch':
      case 'put': return 'update'
      default: return action
    }
  }

  protected getDefaultUri (action: string): string {
    // get /products get /products/:id post /products patch /products/:id del /products/:id

    switch (action) {
      case 'put':
      case 'patch': return '/:id'
      case 'delete': return '/:id'
      case 'show': return '/:id'
      case 'edit': return '/:id/edit'
      default: return ''
    }
  }
}

export default RestRouterBuilder
