import { request } from './default/Default'

describe('Middleware execution', () => {
  it('Global execution', async () => {
    const response = await request.get('/app/middleware/globalmiddleware')

    expect(response.status).toBe(200)
    expect(response.body.global).toEqual(true)
  })

  it('Not global execution', async () => {
    const response = await request.get('/app/middleware/not/globalmiddleware')

    expect(response.status).toBe(200)
    expect(response.body.global).not.toEqual(true)
  })
})
