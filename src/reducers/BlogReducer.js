/* eslint-disable no-case-declarations */
import BlogService from '../services/blogs'

export const postComment = (comment, id) => {
  return async dispatch => {
    const commentbody = {
      comments: comment
    }
    const returnval = await BlogService.postComment(commentbody, id)
    dispatch({
      type: 'addcomment',
      id: id,
      comment: returnval // get object id and comment
    })

  }
}
export const likeblog = (blog) => {
  return async dispatch => {
    dispatch({
      type: 'likeblog',
      id: blog.id
    })
    const likedblog = { ...blog, likes: blog.likes + 1 }
    await BlogService.changeLikes(likedblog)
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const result = await BlogService.createBlog(content)
    const newresult = {
      ...result,
      user: user
    }
    dispatch({
      type: 'addblog',
      content: newresult
    })
  }
}

export const initializeBlogs =  () => {
  return async dispatch => {
    const blogs = await BlogService.getAll()
    dispatch({
      type: 'getblogs',
      data: blogs
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const answer = window.confirm(`Are you sure? ${blog.title} by${blog.author} will be removed`)
    if (answer) {
      await BlogService.removeBlog(blog.id)
      dispatch({
        type: 'deleteblog',
        data: blog
      })
    }
  }
}



const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'addblog':
    // eslint-disable-next-line no-case-declarations
    const newstate = [...state, action.content]
    return newstate
  case 'likeblog':
    const foundblog = state.find(blog => blog.id === action.id)
    const LikedBlog = {
      ...foundblog,
      likes: foundblog.likes + 1
    }
    const newState = state.map(blog => blog.id !== action.id ? blog : LikedBlog)
    return newState
  case 'getblogs':
    return action.data
  case 'deleteblog':
    const freshblogs = state.filter(blog => blog.id !== action.data.id)
    return freshblogs
  case 'addcomment':
    const findblog = state.find(blog => blog.id === action.id)
    findblog.comments = findblog.comments.concat(action.comment) //find comments and add comment obj
    const freshBlogs = state.map(blog => blog.id !== action.id ? blog : findblog)
    return freshBlogs
  }
  return state

}
export default blogReducer