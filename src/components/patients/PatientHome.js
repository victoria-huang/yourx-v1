import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDailyPrescriptions } from '../../actions/prescriptions'
import { setUser, setAdherence, logout } from '../../actions/user'
import { getUser, fetchPatientAdherence, fetchPatientDailyMeds } from '../../fetches'
import Adherence from './Adherence'
import MedsContainer from './MedsContainer'

function getDate() {
  const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday"
  }

  const date = new Date();
  const day = days[date.getDay()]
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  return `${day}, ${mm}/${dd}/${yyyy}`
}

class PatientHome extends Component {
  componentDidMount() {
    getUser()
    .then(json => this.props.setUser({
      username: json[0].username,
      userId: json[0].user_id,
      userClass: json[0].user_class
    }))
    .then(() => {
      const patient_id = this.props.user.userId

      fetchPatientAdherence(patient_id)
      .then(json => this.props.setAdherence(json))

      fetchPatientDailyMeds(patient_id)
      .then(json => this.props.setDailyPrescriptions(json))
    })
  }

  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        Patient Home
        <h1>Hi {this.props.user.username}! Today is {getDate()}</h1>
        <br />
        <Adherence />
        <MedsContainer day="today" />
        <button onClick={() => this.props.history.push("/patient-prescriptions")}>All Prescriptions</button>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setDailyPrescriptions: setDailyPrescriptions,
    setUser: setUser,
    setAdherence: setAdherence,
    logout: logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
