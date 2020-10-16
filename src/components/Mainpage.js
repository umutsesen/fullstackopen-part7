import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Loginform from './login'
import { initializeBlogs } from '../reducers/BlogReducer'
import Blogs from './sendBlogs'
import CreateBlog from './createBlog'
import Message from './Message'
import { logout } from '../reducers/UserReducer'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Userlist from './userlist'
import SpecificUser from './SpecificUser'
import UserService from '../services/users'
import Blog from './Blog'
import { likeblog, deleteBlog, postComment } from '../reducers/BlogReducer'



const MainPage = (props) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (props.user !== null) {
      blogService.setToken(props.user.token)
    }
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  }, [])
  useEffect(() => {
    async function getUsers() {
      const getusers = await UserService.getAll()
      setUsers(getusers)
    }
    getUsers()
  }, [])
  return (
    <Router>
      <div>
        <Message />
        {props.user === null ?
          <Loginform />:
          <div>
            <nav className="bg-gray-800">
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                      <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0">
                      <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo"></img>
                      <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg" alt="Workflow logo"></img>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex">
                        <Link className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out" to='/'>Blogs</Link>
                        <Link to='/users' className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Users</Link>
                      </div>
                    </div>
                  </div>
                </div></div>
            </nav>
            <p>{props.user.username} logged in <button onClick={() => props.logout()}>Logout</button></p>
            <Switch>
              <Route path='/users/:id'>
                <SpecificUser users={users}/>
              </Route>
              <Route path='/users'>
                <Userlist users={users}/>
              </Route>
              <Route path='/blogs/:id'>
                <Blog blogs={props.blogs} user={props.user.username} like={props.likeblog} deleteblog={props.deleteBlog} postcomment={props.postComment}/>
              </Route>
              <Route path='/'>
                <CreateBlog />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Blogs</h2>
                <Blogs />
              </Route>
            </Switch>
            )</div>}
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}
const mapDispatchToProps = {
  logout,
  initializeBlogs,
  likeblog,
  deleteBlog,
  postComment
}


const connectedMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default connectedMainPage