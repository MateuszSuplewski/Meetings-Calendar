import React from 'react'
import CalendarList from './components/CalendarList'
import CalendarForm from './components/CalendarForm'
import CalendarProvider from './CalendarProvider'
import fields from './formFieldsData'

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  date: '',
  time: ''
}

export class Calendar extends React.Component {
    state = {
      meetings: null,
      form: initialFormData,
      formErrors: []
    }

    api = new CalendarProvider('http://localhost:3005')

    isFormValid = () => {
      const { form } = this.state
      let errors = []

      fields.forEach(field => {
        const { name, pattern, label } = field
        const inputValue = form[name]

        if (inputValue.length === 0) {
          errors = errors.concat(`Dane w polu ${label} są wymagane!`)
          return
        }

        if (inputValue.match(pattern)) return

        errors = errors.concat(`Dane w polu ${label} są niepoprawnie wprowadzone!`)
      })

      this.setState({ formErrors: [...errors] })

      return errors.length === 0
    }

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

    loadMeetings = () => {
      this.api.load('meetings')
        .then(data => this.setState({ meetings: [...data] }))
    }

    handleInput = (event) => {
      const { value, name } = event.target
      const form = { ...this.state.form }
      form[name] = value
      this.setState({ form })
    }

    handleSubmit = (event) => {
      event.preventDefault()

      if (this.isFormValid()) this.addMeeting()
    }

    componentDidMount () {
      this.loadMeetings()
    }

    render () {
      const { meetings, form, formErrors } = this.state
      return (
        <div>
          {!meetings ?
            'No meetings'
            :
            <CalendarList meetings={meetings}/>
          }
          <CalendarForm

            fields={fields}
            onSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            formErrors={formErrors}
            form={form}
          />
        </div>
      )
    }
}

export default Calendar
