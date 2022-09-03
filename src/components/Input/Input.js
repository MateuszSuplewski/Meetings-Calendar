import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

export class Input extends React.Component {
  render () {
    const { className, label, ...otherProps } = this.props
    return (
      <>
        <label
          htmlFor={label}
          className={classes.input__label}
        >
          {`${label}: `}
        </label>
        <input
          id={label}
          className={`${classes.root}${className ? ` ${className}` : ''}`}
          {...otherProps}
        />
      </>
    )
  }
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired
}

export default Input
