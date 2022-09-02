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

export class Calendar extends React.Component {
    state = {
      meetings: null,
      form: initialFormData
    }

    api = new CalendarProvider('http://localhost:3005')

    componentDidMount () {
      this.api.load('meetings')
        .then(data => this.setState({ meetings: [...data] }))
    }

    addMeeting = (event) => {
      event.preventDefault()
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

    handleInput = (event, inputName) => {
      const { value } = event.target
      const form = { ...this.state.form }
      form[inputName] = value
      this.setState({ form })
    }

    render () {
      const { meetings, form } = this.state
      return (
        <div>
          {!meetings ?
            'No meetings'
            :
            <CalendarList meetings={meetings}/>
          }
          <CalendarForm
            form={form}
            onSubmit={this.addMeeting}
            handleInput={this.handleInput}
          />
        </div>
      )
    }
}

export default Calendar
