const request = require('supertest')
const app = require('./app')

describe('POST /login', () => {
  it('should login success', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' })
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('should login fail', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'wrong', password: 'wrong' })
    expect(res.statusCode).toBe(401)
    expect(res.body.success).toBe(false)
  })
})
