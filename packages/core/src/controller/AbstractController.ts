import { Request, Response } from '../application'

export abstract class AbstractController {
    protected viewPath: string
    protected layout: string
    protected request: Request
    protected response: Response

    public setViewPath (f: string): void {
      this.viewPath = f
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

    public async index (req, res) {
      return this.render()
    }

    public async create (req, res) {
      return res.render(this.viewPath)
    }

    public async edit (req, res) {
      return res.render(this.viewPath)
    }

    public async detail (req, res) {
      return res.render(this.viewPath)
    }

    protected render (data?: {}, view?: string) {
      let local: any = {}
      if (this.layout) local.layout = this.layout
      if (data) local = { ...local, ...data }

      return this.response.render(view || this.viewPath, local)
    }
}
