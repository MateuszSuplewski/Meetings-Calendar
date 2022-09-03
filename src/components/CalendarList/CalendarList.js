import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import CalendarItem from '../CalendarItem'

export class CalendarList extends React.Component {
  render () {
    const { className, meetings, ...otherProps } = this.props

    return (
      <ul
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        {meetings.map((meeting) => (
          <CalendarItem
            key={meeting.id}
            meeting={meeting}
          />
        )
        )}
      </ul>
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
