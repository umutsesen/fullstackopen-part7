import loginService from '../services/login'
import createBlogService from '../services/blogs'

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'logout',
    })
  }
}


export const Login = (info) => {
  return async dispatch => {
    const user = await loginService.login(info)
    createBlogService.setToken(user.token)
    dispatch({
      type: 'login',
      info: user

    })
  }
}


const UserReducer = (state = null, action) => {
  switch (action.type) {
  case 'login':
    return action.info
  case 'logout':
    return null
  }
  return state
}
export default UserReducer