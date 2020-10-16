import { connect } from 'react-redux'
import React, { useState } from 'react'
import { addMessage } from '../reducers/MessageReducer'
import { Login } from '../reducers/UserReducer'


// set currentuser
const Loginform = (props) => {
  const [username, setUsername] = useState('') // sunu password ve username birlesik maybe later
  const [password, setPassword] = useState('')
  const SubmitForm = async (event) => {
    event.preventDefault()
    try {
      props.Login({ username, password })
      setUsername('')
      setPassword('')

    }
    catch (exception) {
      props.addMessage('Wrong credentials')
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow"></img>
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Sign in to your account
            </h2>
          </div>
          <form className="mt-8" onSubmit={SubmitForm}>
            <input type="hidden" name="remember" value="true"></input>
            <div className="rounded-md shadow-sm">
              <div>
                <input aria-label="Username" type='text' id='username' name='username' onChange={({ target }) => setUsername(target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Username"></input>
              </div>
              <div className="-mt-px">
                <input aria-label="Password" type='password' id='password' name='password' onChange={({ target }) => setPassword(target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password"></input>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"></input>
                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
            Remember me
                </label>
              </div>

              <div className="text-sm leading-5">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            Forgot your password?
                </a>
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
          Sign in
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

const mapDispatchToProps = {
  Login,
  addMessage
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(Loginform)
export default ConnectedLoginForm