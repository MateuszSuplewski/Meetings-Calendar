import React from 'react'
import CalendarList from './components/CalendarList'
import CalendarForm from './components/CalendarForm'
import CalendarProvider from './CalendarProvider'

//      console.log(/[a-ząćęłńóśźż]{2,}/gi.test(value)) // true --- regrex firstName oraz lastName
//      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i --- email regrex
//      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/  --- date regrex
//      /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/  --- hour regrex

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
            addMeeting={this.addMeeting}
            handleInput={this.handleInput}
          />
        </div>
      )
    }
}

export default Calendar
