export interface IKernelMiddleware {
    before: Array<any>,
    after: Array<any>
}

export abstract class KernelConfigInterface {
    globalMiddlewares?: IKernelMiddleware | null
}
