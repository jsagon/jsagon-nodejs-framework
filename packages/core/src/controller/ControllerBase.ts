import { Request, Response } from '../application'

export abstract class ControllerBase {
    protected viewPath: string
    protected layout: string
    protected request: Request
    protected response: Response

    public setViewPath (path: string): void {
      this.viewPath = path
    }

    public setRequest (req: Request): void {
      this.request = req
    }

    public setResponse (res: Response): void {
      this.response = res
    }

    public setLayout (layout?: string): void {
      this.layout = layout
    }

    public async index (req: Request, res: Response): Promise<void> {
      this.render()
    }

    public async create (req: Request, res: Response): Promise<void> {
      res.render(this.viewPath)
    }

    public async edit (req: Request, res: Response): Promise<void> {
      res.render(this.viewPath)
    }

    public async detail (req: Request, res: Response): Promise<void> {
      res.render(this.viewPath)
    }

    protected render (data?: {}, view?: string): void {
      let local: any = {}
      if (this.layout) local.layout = this.layout
      if (data) local = { ...local, ...data }

      this.response.render(view || this.viewPath, local)
    }
}
