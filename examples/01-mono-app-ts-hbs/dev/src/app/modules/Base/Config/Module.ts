import { ModuleBase } from '@jsagon/core'
import HomeController from '../Controller/HomeController'

export default class Module extends ModuleBase {
  public static controllers = [
    HomeController
  ]
}
