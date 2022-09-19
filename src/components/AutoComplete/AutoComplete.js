import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import Input from '../Input'
import SuggestionList from '../SuggestionList'

export class AutoComplete extends React.Component {
  render () {
    const { className, autoComplete, handleAutoComplete, suggestions, handleSuggestionClick, ...otherProps } = this.props

    return (
      <form
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        <Input
          value={autoComplete}
          onChange={handleAutoComplete}
          label={'Szukaj zaplanowanych spotkań po imieniu'}
          className={'input__autoCompleteForm'}
        />
        <SuggestionList
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
      </form>
    )
  }
}

AutoComplete.propTypes = {
  className: PropTypes.string,
  handleSuggestionClick: PropTypes.func.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
  autoComplete: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default AutoComplete
