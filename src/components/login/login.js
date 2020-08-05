import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      valid: false,
      dataLoading: false
    }
  }

  setEmailValue = (e) => {
    const value = e.target.value
    this.setState({ email: value })
  }

  setPasswordValue = (e) => {
    const value = e.target.value
    this.setState({ password: value })
  }

  handleFormSubmit = e => {
    localStorage.setItem("isLoggedIn","true")
    this.props.history.replace("/")
  }

  render() {
    return (
      <div className="form-container">
        <LoadingOverlay
          active={this.state.dataLoading}
          spinner
          text='Please wait...'>
          <div className="con">
            <header className="login-header head-form">
              <h2>Log In</h2>
              <p>login here using your email and password</p>
            </header>
            <br />
            <div>
              <input className="form-input" id="txt-input" type="text" placeholder="Email" onChange={this.setEmailValue} required />
              <br />
              <input className="form-input" type="password" placeholder="Password" id="pwd" name="password" onChange={this.setPasswordValue} required />
              <br />
              <button className="button log-in" onClick={this.handleFormSubmit}> Log In </button>
            </div>
            <div>
              <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: "/register" }} ><button className="button sign-up">Sign Up</button></Link>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    );
  }
}

export default Login;
