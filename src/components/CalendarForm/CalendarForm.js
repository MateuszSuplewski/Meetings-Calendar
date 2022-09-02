import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

export class CalendarForm extends React.Component {
  render () {
    const { className, handleInput, onSubmit, form, ...otherProps } = this.props
    const { firstName, lastName, email, date, time } = form
    return (
      <form
        onSubmit={onSubmit}
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        Imie:
        <input
          value={firstName}
          onChange={(event) => handleInput(event, 'firstName')}
        />
        Nazwisko:
        <input
          value={lastName}
          onChange={(event) => handleInput(event, 'lastName')}
        />
        Email:
        <input
          value={email}
          onChange={(event) => handleInput(event, 'email')}
        />
        Data:
        <input
          value={date}
          onChange={(event) => handleInput(event, 'date')}
        />
        Czas:
        <input
          value={time}
          onChange={(event) => handleInput(event, 'time')}
        />
        <input
          value={'DODAJ'}
          type={'submit'}
        />
      </form>
    )
  }
}

CalendarForm.propTypes = {
  className: PropTypes.string,
  handleInput: PropTypes.func,
  onSubmit: PropTypes.func,
  form: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  })
}

export default CalendarForm
