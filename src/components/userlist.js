import React  from 'react'
import { Link } from 'react-router-dom'

const Userlist = ({ users }) => {

  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <div>
        <h4 style={{ paddingLeft: '35px' }}>Blogs</h4>
        {users.map(user =>
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name} </Link>
            <span> {user.blogs.length}</span>
          </div>)}
      </div>

    </div>
  )
}

export default Userlist