import blogReducer from './reducers/BlogReducer'
import MessageReducer from './reducers/MessageReducer'
import UserReducer from './reducers/UserReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
const reducer = combineReducers({
  blogs: blogReducer,
  message: MessageReducer,
  user: UserReducer

})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
)

export default store