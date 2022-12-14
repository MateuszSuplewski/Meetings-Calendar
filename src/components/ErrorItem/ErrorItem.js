import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

export class ErrorItem extends React.Component {
  render () {
    const { className, error, ...otherProps } = this.props
    return (
      <li
        className={`${classes.root}${className ? ' ' + classes[className] : ''}`}
        {...otherProps}
      >
        {error}
      </li>
    )
  }
}

ErrorItem.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string.isRequired
}

export default ErrorItem
