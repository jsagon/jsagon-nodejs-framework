import { MiddlewareType } from '../route/builder/RouteLib'

export interface IKernelMiddleware {
    registered: {[key: string]: Function}[],
    before: MiddlewareType[],
    after: MiddlewareType[]
}

export abstract class KernelConfigInterface {
    globalMiddlewares?: IKernelMiddleware | null
}
