import { AppMiddleware } from './middlewares/AppMiddleware'

export default {
  // Middlewares that should run for every route in project - Middleware que rodará em todas as rotas do projeto
  middlewares: {
    registered: {
      app: AppMiddleware
    },
    // Middlewares that should run before a route - Middleware a ser executado antes da rota
    before: [
      'app'
    ],
    // Middlewares that should run after a route - Middleware a ser executado depois da rota
    after: [
    ]
  }
}
