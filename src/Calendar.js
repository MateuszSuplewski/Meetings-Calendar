import React from 'react'
import CalendarList from './components/CalendarList'
import CalendarForm from './components/CalendarForm'

export class Calendar extends React.Component {
    state = {
      meetings: null,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: ''
      }
    }

    api = 'http://localhost:3005/meetings'

    componentDidMount () {
      this._fetch()
        .then(data => this.setState({ meetings: [...data] }))
    }

    addMeeting = (event) => {
      event.preventDefault()
      const { meetings, form } = this.state

      const options = {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' }
      }

      this._fetch(options)
        .then(data => {
          const { id } = data
          this.setState({
            meetings: [...meetings, { ...form, id }]
          })
        })
    }

    handleInput = (event, inputName) => {
      const { value } = event.target
      const form = { ...this.state.form }
      form[inputName] = value
      this.setState({ form })
    }

    _fetch (options, additionalPath = '') {
      const url = `${this.api}${additionalPath}`
      return fetch(url, options)
        .then(resp => {
          if (resp.ok) return resp.json()
          return Promise.reject(resp)
        })
    }

    // Api methods

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
