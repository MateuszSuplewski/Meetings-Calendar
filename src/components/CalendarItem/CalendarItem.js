import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

export class CalendarItem extends React.Component {
  render () {
    const { className, meeting, ...otherProps } = this.props
    const { firstName, lastName, email, date, time } = meeting

    return (
      <li
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        <p className={classes.item__paragraph__name}>{firstName} {lastName}</p>
        <p className={classes.item__paragraph__email}>{email}</p>
        <p className={classes.item__paragraph__date}>{date} --- {time}</p>
      </li>
    )
  }
}

CalendarItem.propTypes = {
  className: PropTypes.string,
  meeting: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  })
}

export default CalendarItem
