import supertest from 'supertest'
import { app, bootstrap } from '../../app'

bootstrap.registerRoutes()

export const request = supertest.agent(app)
