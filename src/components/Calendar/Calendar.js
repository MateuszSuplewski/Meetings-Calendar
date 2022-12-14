import React from 'react'
import CalendarList from '../CalendarList'
import CalendarForm from '../CalendarForm'
import AutoComplete from '../AutoComplete'
import CalendarProvider from '../../helpers/CalendarProvider'
import fields from '../../helpers/formFieldsData'
import initialFormData from '../../helpers/initialFormData'
import classes from './styles.module.css'

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
        const { name, pattern, label, error } = field
        const inputValue = form[name]

        if (inputValue.length === 0) {
          errors = errors.concat(`Dane w polu ${label} są wymagane!`)
          return
        }

        if (inputValue.match(pattern)) return

        errors = errors.concat(error)
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

    loadMeetingsByFirstName = () => {
      this.getSuggestions()
        .then(data => this.setState({ meetings: [...data] }))
    }

    loadSuggestions = () => {
      this.getSuggestions()
        .then(data => this.setState({ suggestions: [...data] }))
    }

    getSuggestions = () => {
      const { autoComplete } = this.state
      return this.api.load(`meetings?firstName_like=${autoComplete}`)
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

    handleSuggestionClick = (event) => {
      const { innerText } = event.target

      this.setState({ autoComplete: innerText, suggestions: [] }, () => this.loadMeetingsByFirstName())
    }

    handleAutoComplete = (event) => {
      const { value } = event.target

      if (!value) this.loadMeetings()

      if (value.length < 2) {
        this.setState({ suggestions: [], autoComplete: value })
        return
      }

      this.setState({ autoComplete: value }, () => this.loadSuggestions())
    }

    componentDidMount () {
      this.loadMeetings()
    }

    render () {
      const { meetings, form, formErrors, autoComplete, suggestions } = this.state
      return (
        <div className={`${classes.root}`}>
          <CalendarForm
            fields={fields}
            onSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            formErrors={formErrors}
            form={form}
          />
          {!meetings ?
            'No meetings'
            :
            <CalendarList meetings={meetings}/>
          }
          <AutoComplete
            suggestions={suggestions}
            handleSuggestionClick = {this.handleSuggestionClick}
            autoComplete={autoComplete}
            handleAutoComplete={this.handleAutoComplete}
          />
        </div>
      )
    }
}

export default Calendar
