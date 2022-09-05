import React from 'react'
import PropTypes from 'prop-types'
import SuggestionItem from '../SuggestionItem'
import classes from './styles.module.css'

export class Suggestion extends React.Component {
  render () {
    const { className, suggestions, handleAutoCompleteClick, ...otherProps } = this.props
    return (
      <ul
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        {
          suggestions.map((suggestion) => {
            const { firstName, id } = suggestion
            return (
              <SuggestionItem
                key={id}
                suggestion={firstName}
                onClick={handleAutoCompleteClick}
              />
            )
          }
          )
        }
      </ul>
    )
  }
}

Suggestion.propTypes = {
  className: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAutoCompleteClick: PropTypes.func.isRequired
}

export default Suggestion
