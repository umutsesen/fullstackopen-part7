const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})

test('id is unique property', async () => {
  const object = new Blog ({
    title: 'sddf',
    author: '2asd111111',
    url: 'a111n',
  })
  const result = await api.post('/api/blogs').send(object).expect(201)
  const id = await result.body.id

  expect(id).toBeDefined()
})

test('LikeCheck', async () => {
  const object = new Blog ({
    title: 'sddf',
    author: '2asd111111',
    url: 'a111n',
  })
  const result = await api.post('/api/blogs').send(object).expect(201)
  const likes = await result.body.likes

  expect(likes).toEqual(0)
})

test('TitleNUrlCheck', async () => {
  const object = new Blog ({
    author: '2asd111111',
  })
  await api.post('/api/blogs').send(object).expect(400)
})