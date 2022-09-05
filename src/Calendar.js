import React from 'react'
import CalendarList from './components/CalendarList'
import CalendarForm from './components/CalendarForm'
import CalendarProvider from './CalendarProvider'
import fields from './formFieldsData'
import Input from './components/Input'
import SuggestionList from './components/SuggestionList'

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
      formErrors: [],
      autoComplete: '',
      suggestions: []
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

    handleAutoComplete = (event) => {
      const { value } = event.target

      if (!value) {
        this.loadMeetings()
      }

      this.setState({ autoComplete: value }, () => this.loadAutoComplete())
    }

    loadAutoComplete = () => {
      const { autoComplete } = this.state

      this.api.load(`meetings?firstName_like=${autoComplete}`)
        .then(data => this.setState({ suggestions: [...data] }))
    }

    handleAutoCompleteClick = (event) => {
      const { innerText } = event.target

      this.setState({ autoComplete: innerText, suggestions: [] }, () => this.loadMeetingsAfterAutoComplete())
    }

    loadMeetingsAfterAutoComplete = () => {
      const { autoComplete } = this.state

      this.api.load(`meetings?firstName_like=${autoComplete}`)
        .then(data => this.setState({ meetings: [...data] }))
    }

    render () {
      const { meetings, form, formErrors, autoComplete, suggestions } = this.state
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
          <Input
            value={autoComplete}
            onChange={this.handleAutoComplete}
            label={'Look for meeting by name'}
          />
          <SuggestionList
            suggestions={suggestions}
            handleAutoCompleteClick = {this.handleAutoCompleteClick}
          />
        </div>
      )
    }
}

export default Calendar
