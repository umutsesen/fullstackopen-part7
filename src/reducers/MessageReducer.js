/* eslint-disable linebreak-style */


export const addMessage = (content) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'HideMessage',
      })
    }, 2000)
    dispatch({
      type: 'ShowMessage',
      data: content
    })
  }
}

const MessageReducer = (state = '', action) => {
  switch (action.type) {
  case 'ShowMessage':
    return action.data
  case 'HideMessage':
    return ''
  }
  return state

}
export default MessageReducer