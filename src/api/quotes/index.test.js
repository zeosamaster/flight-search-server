import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Quotes } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, quotes

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  quotes = await Quotes.create({ user })
})

test('POST /quotes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, Country: 'test', Currency: 'test', Locale: 'test', Origin: 'test', Destination: 'test', OutDate: 'test', InDate: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Country).toEqual('test')
  expect(body.Currency).toEqual('test')
  expect(body.Locale).toEqual('test')
  expect(body.Origin).toEqual('test')
  expect(body.Destination).toEqual('test')
  expect(body.OutDate).toEqual('test')
  expect(body.InDate).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /quotes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /quotes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /quotes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /quotes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${quotes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(quotes.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /quotes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${quotes.id}`)
  expect(status).toBe(401)
})

test('GET /quotes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /quotes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${quotes.id}`)
    .send({ access_token: userSession, Country: 'test', Currency: 'test', Locale: 'test', Origin: 'test', Destination: 'test', OutDate: 'test', InDate: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(quotes.id)
  expect(body.Country).toEqual('test')
  expect(body.Currency).toEqual('test')
  expect(body.Locale).toEqual('test')
  expect(body.Origin).toEqual('test')
  expect(body.Destination).toEqual('test')
  expect(body.OutDate).toEqual('test')
  expect(body.InDate).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /quotes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${quotes.id}`)
    .send({ access_token: anotherSession, Country: 'test', Currency: 'test', Locale: 'test', Origin: 'test', Destination: 'test', OutDate: 'test', InDate: 'test' })
  expect(status).toBe(401)
})

test('PUT /quotes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${quotes.id}`)
  expect(status).toBe(401)
})

test('PUT /quotes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, Country: 'test', Currency: 'test', Locale: 'test', Origin: 'test', Destination: 'test', OutDate: 'test', InDate: 'test' })
  expect(status).toBe(404)
})

test('DELETE /quotes/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${quotes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /quotes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${quotes.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /quotes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${quotes.id}`)
  expect(status).toBe(401)
})

test('DELETE /quotes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
