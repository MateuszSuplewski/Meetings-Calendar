import React from 'react'
import PropTypes from 'prop-types'
import ErrorItem from '../ErrorItem'
import classes from './styles.module.css'

export class ErrorList extends React.Component {
  render () {
    const { className, formErrors, ...otherProps } = this.props
    return (
      <ul
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        {
          formErrors.map((error) => (
            <ErrorItem
              key={error}
              error={error}
            />
          )
          )
        }
      </ul>
    )
  }
}

ErrorList.propTypes = {
  className: PropTypes.string,
  formErrors: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ErrorList
