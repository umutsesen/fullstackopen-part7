import React, { useState } from 'react'
import { createBlog } from '../reducers/BlogReducer'
import Toggle from '../utils/toggle'
import { connect } from 'react-redux'
import { addMessage } from '../reducers/MessageReducer'
const CreateBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await props.createBlog({ title, author, url }, props.user)
      setTitle('')
      setAuthor('')
      setUrl('')
      props.addMessage(` Your blog with ${title}title has been added to the list `)

    }
    catch (exception) {
      props.addMessage(` Could not create blog with ${title} title, it already exists! `)
    }
  }
  return (
    <div>
      <Toggle buttonLabel={'Create a new Blog'} >
        <h2> Create a new blog </h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label><input type='text' value={title} id='title' onChange={({ target }) => setTitle(target.value)} name='title'></input><br></br>
          <label>Author:</label><input type='text' value={author} id='author' onChange={({ target }) => setAuthor(target.value)} name='author'></input><br></br>
          <label>Url:</label><input type='text' value={url} id='url' onChange={({ target }) => setUrl(target.value)} name='url'></input><br></br>
          <button type='submit'>Create</button>
        </form>
      </Toggle>

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    message: state.message,
    user: state.user
  }
}
const mapDispatchToProps = {
  createBlog,
  addMessage
}
const CreatedBlog = connect(mapStateToProps, mapDispatchToProps)(CreateBlog)

export default CreatedBlog