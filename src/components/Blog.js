import React, { useState } from 'react'
import {
  useParams
} from 'react-router-dom'



const Blog = ({ blogs, like, deleteblog, user, postcomment }) => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const handleSubmit = (event) => {
    event.preventDefault()
    postcomment(comment, blog.id)
    setComment('')
  }
  return (
    <div>
      <div className="bg-white text-center shadow overflow-hidden sm:rounded-lg">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm leading-5 font-medium text-gray-500">
          Title
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {blog.title}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm leading-5 font-medium text-gray-500">
          Author
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {blog.author}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm leading-5 font-medium text-gray-500">
          Url
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {blog.url}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm leading-5 font-medium text-gray-500">
          Likes
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {blog.likes} <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => like(blog)}>Like</button>
            </dd>
          </div>
        </dl>
        {user === blog.user.username ? <button className="bg-gray-500  hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteblog(blog)}>Remove Blog</button> : <br></br>}
      </div>

      <br></br>
      <div className='text-center'>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Comments</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='comment'>New Comment</label><textarea className="border-solid border-4 border-gray-600" onChange={({ target }) => setComment(target.value)} id='comment' name='comment' rows='4' cols='50' value={comment}></textarea>
          <button type='submit' value='Post Comment' className="inline-flex items-center justify-center p-2 rounded-md bg-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">Post Comment</button>
        </form>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"> Comments</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blog.comments.map(comment =>  <tr  key={comment.id}><td className="px-6 py-4 whitespace-no-wrap"><div className="flex items-center"> <div className="ml-4"><div className="text-sm leading-5 font-medium text-gray-900"></div>{comment.comment}</div></div></td></tr>)}



                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Blog