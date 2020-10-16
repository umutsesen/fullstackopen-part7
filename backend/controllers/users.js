const bcrypt = require('bcrypt')
const UserRouter = require('express').Router()
const User = require('../models/user')

UserRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { author: 1, title: 1, likes: 1 })
  response.json(users)
})

UserRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3 ) {
    return response.status(406).send('Password Length must be greater than 3!')
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = UserRouter