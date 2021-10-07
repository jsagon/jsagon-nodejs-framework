import { ModuleBase } from '@jsagon/core'
import TestMethodHttpController from '../Controller/TestMethodHttpController'
import TestMiddlewareController from '../Controller/TestMiddlewareController'

export default class Module extends ModuleBase {
  public static controllers = [
    TestMethodHttpController,
    TestMiddlewareController
  ]
}
