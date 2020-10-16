import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggle = React.forwardRef((props, ref) =>  {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div>
        <button onClick={toggleVisibility}>{visible === false ? props.buttonLabel : 'Hide' }</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
      </div>
    </div>
    )
})

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggle.displayName = 'Toggle'

export default Toggle
