import { request } from './default/Default'

const data = { name: 'Test' }
const dataToSend = { data: data }

describe('Http Methods Call', () => {
  it('Get request', async () => {
    const response = await request.get('/app/method/get').query(dataToSend)

    expect(response.status).toBe(200)
    expect(response.body.data).toEqual(data)
  })

  it('Post request', async () => {
    const response = await request.post('/app/method/post').send(dataToSend)

    expect(response.status).toBe(201)
    expect(response.body.data).toEqual(data)
  })

  it('Put request', async () => {
    const response = await request.put('/app/method/put/1').send(dataToSend)

    expect(response.status).toBe(200)
    expect(response.body.id).toEqual('1')
  })

  it('Patch request', async () => {
    const response = await request.patch('/app/method/patch/1').send(dataToSend)

    expect(response.status).toBe(200)
    expect(response.body.id).toEqual('1')
  })

  it('Delete request', async () => {
    const response = await request.delete('/app/method/delete/1').send(dataToSend)

    expect(response.status).toBe(204)
  })
})
