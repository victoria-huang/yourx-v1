import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, fetchPatient } from '../../fetches';
import { setUser } from '../../actions/user'
import { addPrescription, setAllPrescriptions } from  '../../actions/prescriptions'

const DEFAULT_STATE = {
  monClicked: false,
  tuesClicked: false,
  wedClicked: false,
  thursClicked: false,
  friClicked: false,
  satClicked: false,
  sunClicked: false
}

class PatientPrescriptions extends Component {
  state = {
    ...DEFAULT_STATE
  }

  componentDidMount() {
    getUser()
    .then(json => this.props.setUser({
      username: json[0].username,
      userId: json[0].user_id,
      userClass: json[0].user_class
    }))
    .then(() => {
      const patient_id = this.props.user.userId

      fetchPatient(patient_id)
      .then(json => {
        const prescriptions = json.prescriptions;
        this.props.setAllPrescriptions(prescriptions);
      })
    })
  }

  render() {
    return (
      <div>
      Patient Prescriptions

      <button onClick={this.handleClick} name="Mon">Monday</button>
      <button onClick={this.handleClick} name="Mon">Tuesday</button>
      <button onClick={this.handleClick} name="Mon">Wednesday</button>
      <button onClick={this.handleClick} name="Mon">Thursday</button>
      <button onClick={this.handleClick} name="Mon">Friday</button>
      <button onClick={this.handleClick} name="Mon">Saturday</button>
      <button onClick={this.handleClick} name="Mon">Sunday</button>

      <button onClick={this.props.addPrescription}>Add Prescription</button>
      <button onClick={() => this.props.history.push("/patient-home")}>Home</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.prescriptions)
  return {
    user: state.user,
    prescriptions: state.prescriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser,
    addPrescription: addPrescription,
    setAllPrescriptions: setAllPrescriptions
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientPrescriptions);
