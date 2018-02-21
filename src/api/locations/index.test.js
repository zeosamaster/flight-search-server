import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Locations } from '.'

const app = () => express(apiRoot, routes)

let locations

beforeEach(async () => {
  locations = await Locations.create({})
})

test('GET /locations 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /locations/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${locations.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(locations.id)
})

test('GET /locations/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
