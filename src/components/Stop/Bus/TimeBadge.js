import React from 'react'
import Radium from 'radium'
import Badge from '../../common/Badge'
import Colors from '../../common/Colors'
import moment from 'moment'

let style = {

  base: {
    display: 'flex',
    flexDirection: 'column'
  },

  time: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white'
  },

  label: {
    fontSize: '.75rem',
    color: 'white'
  },

  imminent15: {
    background: Colors.green.base
  },

  imminent10: {
    background: Colors.yellow.base
  },

  imminent5: {
    background: Colors.orange.base
  },

  imminent: {
    background: Colors.red.base
  },

  departed: {
    color: Colors.blue.base
  }

}

function timeToArrival(minutes) {

  debugger
  minutes = parseInt(minutes)

  if (minutes >= 15) {
    return 'imminent15'
  } else if (minutes < 15 && minutes >= 10) {
    return 'imminent10'
  } else if (minutes < 10 && minutes >= 5) {
    return 'imminent5'
  } else if (minutes < 5 && minutes >= 0) {
    return 'imminent'
  } else if (minutes < 0) {
    return 'departed'
  } else {
    return 'imminent15'
  }

}

function pickTemplate(minutes) {

  debugger
  minutes = parseInt(minutes)

  if (minutes === 0) {
    return <TimeBadgeNow />
  } else if (minutes < 0) {
    return <TimeBadgeGone />
  } else {
    return <TimeToArrival time={minutes} />
  }
}

class TimeBadgeGone extends React.Component {
  render() {
    return (
      <span style={[style.time, style.departed]}>Gone</span>
    )
  }
}

class TimeBadgeNow extends React.Component {
  render() {
    return (
      <span style={style.time}>Now</span>
    )
  }
}

class TimeToArrival extends React.Component {
  render() {
    return (
      <div style={[style.base, style.timingStyle]}>
        <span style={style.time}>{this.props.time}</span>
        <span style={style.label}>Minutes</span>
      </div>
    )
  }
}

TimeBadgeGone = Radium(TimeBadgeGone)
TimeBadgeNow = Radium(TimeBadgeNow)
TimeToArrival = Radium(TimeToArrival)

class TimeBadge extends React.Component {

  render() {

    const time = moment(moment().diff(moment(this.props.time))).format('m')
    const timingStyle = style[timeToArrival(time)];

    return (
      <Badge background={timingStyle.background}>
        {pickTemplate(time)}
      </Badge>
    )
  }
}

export default Radium(TimeBadge)
