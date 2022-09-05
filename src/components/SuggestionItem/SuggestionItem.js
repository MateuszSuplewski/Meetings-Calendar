import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

export class SuggestionItem extends React.Component {
  render () {
    const { className, suggestion, ...otherProps } = this.props
    return (
      <li
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        {suggestion}
      </li>
    )
  }
}

SuggestionItem.propTypes = {
  className: PropTypes.string,
  suggestion: PropTypes.string.isRequired
}

export default SuggestionItem
