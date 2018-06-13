import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/user'

class PatientNavBar extends Component {
  handleLogout = () => {
    this.props.logout()
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <div className="ui grey inverted small borderless top fixed menu">
          <a href="/patient-home" className="item">
            <img src={require('../assets/pill_logo.png')} height='28px' width='28px' alt='pill logo' />
          </a>

          <a href="/patient-prescriptions" className="item">
            <i className="big medkit icon"></i>
          </a>
          <a className="item">
            <i className="big chart line icon"></i>
          </a>

          <div className="right menu">
            <a className="item">
                <i className="big icons">
                  <i className="pills icon"></i>
                  <i className="top right corner add icon"></i>
                </i>
            </a>
            <div className="ui simple dropdown item">
              <i className="big user icon"></i><i className="dropdown icon"></i>
              <div className="menu">
                <a className="item">Profile</a>
                <a onClick={this.handleLogout} className="item">Logout</a>
              </div>
            </div>
          </div>
        </div>
        <div className="ui segment">
          <p></p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout: logout
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(PatientNavBar);