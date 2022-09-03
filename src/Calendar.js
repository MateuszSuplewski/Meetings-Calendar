import React from 'react'
import CalendarList from './components/CalendarList'
import CalendarForm from './components/CalendarForm'
import CalendarProvider from './CalendarProvider'

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  date: '',
  time: ''
}

const inputValidators = {
  firstNameRegrex: /[a-ząćęłńóśźż]{2,}/i,
  lastNameRerex: /[a-ząćęłńóśźż]{2,}/i,
  emailRegrex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
  dateRegrex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  timeRegrex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/
}

export class Calendar extends React.Component {
    state = {
      meetings: null,
      form: initialFormData,
      formErrors: []
    }

    api = new CalendarProvider('http://localhost:3005')

    addMeeting = () => {
      const { meetings, form } = this.state

      this.api.add(form, 'meetings')
        .then(data => {
          const { id } = data
          this.setState({
            meetings: [...meetings, { ...form, id }],
            form: initialFormData
          })
        })
    }

    isFormValid = () => {
      const { form } = this.state
      const inputNames = Array.from(Object.keys(form))
      const inputValidatorValues = Array.from(Object.values(inputValidators))
      const inputValues = Array.from(Object.values(form))
      let errors = []

      inputValues.forEach((inputValue, index) => {
        if (inputValidatorValues[index].test(inputValue)) return

        errors = errors.concat(`${inputNames[index]} is not passing requirements!`)
      })

      this.setState({ formErrors: [...errors] })

      return errors.length === 0
    }

    handleInput = (event, inputName) => {
      const { value } = event.target
      const form = { ...this.state.form }
      form[inputName] = value
      this.setState({ form })
    }

    handleSubmit = (event) => {
      event.preventDefault()

      if (this.isFormValid()) this.addMeeting()
    }

    componentDidMount () {
      this.api.load('meetings')
        .then(data => this.setState({ meetings: [...data] }))
    }

    render () {
      const { meetings, form, formErrors } = this.state
      const inputNames = Array.from(Object.keys(form))
      const inputValues = Array.from(Object.values(form))

      return (
        <div>
          {!meetings ?
            'No meetings'
            :
            <CalendarList meetings={meetings}/>
          }
          <CalendarForm
            inputNames={inputNames}
            inputValues={inputValues}
            addMeeting={this.handleSubmit}
            handleInput={this.handleInput}
            formErrors={formErrors}
          />
        </div>
      )
    }
}

export default Calendar
