import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

export class CalendarList extends React.Component {
  render () {
    const { className, meetings, ...otherProps } = this.props

    return (
      <li
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        {meetings.map((meeting) => {
          const { firstName, lastName, email, date, time, id } = meeting
          return (
            <div key={id}>
              <p>{firstName}</p>
              <p>{lastName}</p>
              <p>{email}</p>
              <p>{date}</p>
              <p>{time}</p>
            </div>
          )
        })}
      </li>
    )
  }
}

const taskPrototype = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
})

CalendarList.propTypes = {
  className: PropTypes.string,
  meetings: PropTypes.arrayOf(taskPrototype).isRequired
}

export default CalendarList
