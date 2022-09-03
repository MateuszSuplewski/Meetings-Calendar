import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'
import ErrorList from '../ErrorList'
import classes from './styles.module.css'

export class CalendarForm extends React.Component {
  render () {
    const { className, handleInput, form, formErrors, fields, ...otherProps } = this.props
    return (
      <form
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        {
        fields.map((field) => {
          const { name, label } = field
          const inputValue = form[name]
          return (
            <Input
              key={name}
              value={inputValue}
              label={label}
              name={name}
              onChange={handleInput}
            />
          )
        }
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

const fieldsPrototype = PropTypes.shape({
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
})

const formPrototype = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
})

CalendarForm.propTypes = {
  className: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  formErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  fields: PropTypes.arrayOf(fieldsPrototype).isRequired,
  form: formPrototype.isRequired
}

export default CalendarForm
