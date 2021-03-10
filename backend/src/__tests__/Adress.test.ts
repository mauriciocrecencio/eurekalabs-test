import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'

describe('Adresses', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })
  it('Should be able to create a new address', async () => {
    const response = await request(app).post('/adresses').send({ cep: 82310110})
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('cep')
    expect(response.body).toHaveProperty('street')
    expect(response.body).toHaveProperty('city')
  })
  it('Should be able to get all adresses', async () => {
    await request(app).post('/adresses').send({ cep: 89227608 })
    const response = await request(app).get('/adresses')
    expect(response.body.length).toBe(2)
  })
})
