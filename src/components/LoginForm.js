import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/user'

const DEFAULT_STATE = {
  username: '',
  password: '',
  errors: []
}

class LoginForm extends Component {
  state = {
    ...DEFAULT_STATE
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      username: this.state.username,
      password: this.state.password
    }

    fetch(this.props.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        this.setState({
          errors: [json.errors]
        })
      } else {
        this.setState({
          ...DEFAULT_STATE
        })

        this.props.setUser({
          username: json.username,
          userId: json.user_id,
          userClass: json.user_class,
        })

        this.props.onSuccess(json, this.props.history);
      }
    });
  }

  render() {
    const errors = this.state.errors.map((error, idx) => { return <li key={idx}>{error}</li> })

    return (
      <div>
        <div className="content-container">
          <img src={require('../assets/blur_bg.jpg')} alt='background' />
        </div>
        <div className="my-content auth">
          { this.props.type === "Patient" ?
            <i aria-hidden="true" className="circular pills huge icon"></i>
          :
            <i aria-hidden="true" className="circular user doctor huge icon"></i>
          }

          <br /><br /><br />

          { this.state.errors.length > 0 ?
            <div className="ui error message">
              <ul className="list">
                { errors }
              </ul>
            </div>
          :
            null
          }

          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field ui big fluid left icon input">
              <input required name="username" type="text" placeholder='username' value={this.state.username} onChange={this.handleChange} />
              <i className="user icon"></i>
            </div>
            <div className="field ui big fluid left icon input">
              <input required name="password" type="password" placeholder='password' value={this.state.password} onChange={this.handleChange} />
              <i className="key icon"></i>
            </div>
            <button type="submit" className="fluid ui large button">Login as {this.props.type}</button>
          </form>
          <br />
          <div className="ui inverted divider"></div>
          <a className="back-link" onClick={() => this.props.history.push("/")}>
             &#8592; Back to Welcome
          </a>

        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginForm);
