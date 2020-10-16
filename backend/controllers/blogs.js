const BlogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comments = require('../models/comments')



BlogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { comment : 1 })
  response.json(blogs)
})

BlogRouter.post('/', async (request, response) => {
  if (!request.token || !request.token.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  console.log(request.token)
  const blog = request.body
  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.title && !blog.url) {
    return response.status(400).end()
  }

  const user = await User.findById(request.token.id)

  const NewBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: user._id
  })
  const saved = await NewBlog.save()
  user.blogs = user.blogs.concat(NewBlog._id)
  await user.save()
  response.status(201).json(saved)
})


BlogRouter.get('/info', async (req, res) => {
  const length = Object.keys(Blog).length
  const nowdate = new Date()
  res.send(`Blog has ${length} posts as of ${nowdate}` )
})

BlogRouter.get('/:id', async (request, response) => {
  const getSpecificBlog = await Blog.findById(request.params.id)
  getSpecificBlog ? response.json(getSpecificBlog) : response.status(404).end()
})


BlogRouter.delete('/:id', async (request, response) => {
  if (!request.token || !request.token.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === request.token.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    await User.updateOne({ _id: request.token.id }, { $pull: { 'blogs' : request.params.id } })
  } else { return response.status(400).json( { error: 'Cannot delete blog' } )}
  return response.status(204).end()

})


BlogRouter.put('/:id', async (request, response) => {
  const body =  await request.body
  const oldbody = await Blog.findById(request.params.id)

  const blog = {
    title: oldbody.title,
    author: oldbody.author,
    url: oldbody.url,
    comments: oldbody.comments,
    likes: body.likes
  }
  const UpdatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(UpdatedBlog)

})

BlogRouter.post('/:id/comments', async (request, response) => {
  const body = await request.body
  console.log(body)
  const oldbody = await Blog.findById(request.params.id)
  const newcomments = new Comments({
    comment: body.comments
  })
  const newcomment = await newcomments.save() //
  oldbody.comments = oldbody.comments.concat(newcomment._id)
  await oldbody.save()
  response.status(201).json(newcomment)


})


module.exports = BlogRouter