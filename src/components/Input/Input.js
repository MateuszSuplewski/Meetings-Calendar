import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

export class Input extends React.Component {
  render () {
    const { className, label, handleInput, ...otherProps } = this.props
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
          onChange={(event) => handleInput(event, label)}
        />
      </>
    )
  }
}

Input.propTypes = {
  className: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default Input
