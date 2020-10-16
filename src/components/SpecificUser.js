import React from 'react'
import {
  useParams
} from 'react-router-dom'


const SpecificUser = ({ users }) => {
  const id = useParams().id
  const user = users.find(user => user.id === id)
  if (!user) {
    return null
  }


  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </div>
  )

}

export default SpecificUser