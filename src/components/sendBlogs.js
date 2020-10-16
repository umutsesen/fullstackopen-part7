import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = (props) => {
  const sortedblogs = props.blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {sortedblogs.map(blog => <li key={blog.id}> <Link to={`blogs/${blog.id}`}>{blog.title}</Link></li>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const ConnectedBlogs = connect(
  mapStateToProps, null)(Blogs)

export default ConnectedBlogs
