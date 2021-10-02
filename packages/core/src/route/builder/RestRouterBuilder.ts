import { HTTPMethod } from '../../utils'
import { Actions } from './RouteLib'
import RouterBuilder from './RouterBuilder'

class RestRouterBuilder extends RouterBuilder {
  protected rest = true

  public allDefaults (): RouterBuilder {
    return this.store().patch().del().show().edit().index()
  }

  protected getDefaultAction (action: string): string {
    switch (action) {
      case HTTPMethod.Post: return ''
      case HTTPMethod.Path:
      case HTTPMethod.Put: return 'update'
      default: return action
    }
  }

  protected getDefaultUri (action: string): string {
    switch (action) {
      case HTTPMethod.Put:
      case HTTPMethod.Path: return '/:id'
      case HTTPMethod.Delete: return '/:id'
      case Actions.Show: return '/:id'
      case Actions.Edit: return '/:id/edit'
      default: return ''
    }
  }
}

export default RestRouterBuilder
