import { Route } from '@jsagon/core'
import HomeController from '../Controller/HomeController'

const route = Route('/', HomeController)
  .index()

export default route
