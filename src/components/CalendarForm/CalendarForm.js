import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'
import ErrorList from '../ErrorList'
import classes from './styles.module.css'

export class CalendarForm extends React.Component {
  render () {
    const { className, handleInput, addMeeting, inputNames, inputValues, formErrors, ...otherProps } = this.props
    return (
      <form
        onSubmit={addMeeting}
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        {
        inputNames.map((inputName, index) => (
          <Input
            key={inputName}
            type={'text'}
            value={inputValues[index]}
            label={inputName}
            handleInput={handleInput}
          />
        )
        )}
        <ErrorList formErrors={formErrors}/>
        <input
          className={classes.form__submit}
          value={'ADD'}
          type={'submit'}
        />
      </form>
    )
  }
}

CalendarForm.propTypes = {
  className: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  addMeeting: PropTypes.func.isRequired,
  inputNames: PropTypes.array.isRequired,
  inputValues: PropTypes.array.isRequired,
  formErrors: PropTypes.array.isRequired // array of strings zrobic
}

export default CalendarForm
