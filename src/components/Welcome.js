import React, { Component } from 'react';

export default class Welcome extends Component {
  handleClick = (event) => {
    const path = `/${event.target.name}-login`;
    this.props.history.push(path)
  }

  render() {
    return (
      <div className="welcome">
        <div className="content-container">
          <video autoPlay loop>
            <source src="https://dl.dropboxusercontent.com/s/fcwea9gqasw6gb1/medicine_packages.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="my-content home">
          <img src={require("../assets/pill_logo.png")} height='90px' width='90px' alt='pill logo' />
          <h1 className="logo">Y o u R x</h1>
          <h2>Embrace your health.</h2>
          <br />
          <button name="patient" className="ui large button" onClick={this.handleClick}>Patient Login</button>
          <button name="provider" className="ui large button" onClick={this.handleClick}>Provider Login</button>
          <br />
          <div className="ui horizontal divider"> OR </div>
          <p>Don't have an account? <a onClick={() => this.props.history.push("/register-choice")}>Sign up</a> today!</p>
        </div>
      </div>
    )
  }
}
