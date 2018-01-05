import React from 'react'
import PropTypes from 'prop-types'
import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
  
  //const handleToggle = props.handleToggle.bind(null, props.id)

  // partial utility replaced above line of code for binding. 
  const handleToggle = partial(props.handleToggle, props.id)
  return (
    <li>
      <input type="checkbox" 
        onChange={handleToggle}
        checked={props.isComplete} />{props.name}
    </li>
  ) 
}

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.number.isRequired
}