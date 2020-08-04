import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

class Register extends Component {

    flag = false;
    constructor(porps) {
        super(porps)
        this.state = {
            email: null,
            password: null,
            name: null,
            contactNumber: 1000000000
        }
    }

    setEmailValue = (e) => {
        this.setState({ email: e.target.value })
    }

    setPasswordValue = async (e) => {
        this.setState({ password: e.target.value })
    }

    setNameValue = (e) => {
        this.setState({ name: e.target.value })
    }

    setContactNumberValue = (e) => {
        this.setState({ contactNumber: e.target.value })
    }

    handleSubmit = async () => {
        console.log("Handle Submit");
    }

    render() {
        return (
            <div className="form-container">
                <div className="con">
                    <header className="head-form login-header">
                        <h2>Sign up</h2>
                        <p>Sign up here using mail ID</p>
                    </header>
                    <br />
                    <div>
                        <input className="form-input" type="text" placeholder="Name*" onChange={this.setNameValue} required />
                        <br />
                        <input className="form-input" type="email" placeholder="Email*" onChange={this.setEmailValue} required />
                        <br />
                        <input className="form-input" type="password" placeholder="Password*" id="pwd" name="password" onChange={this.setPasswordValue} required />
                        <br />
                        <input className="form-input" type="text" placeholder="Mobile number without +" onChange={this.setContactNumberValue} />
                        <br />
                        <button className="button log-in" type="submit" onClick={this.handleSubmit}> Sign up </button>
                    </div>
                    <div>
                        <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: "/login" }} ><button className="button sign-up">Login</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;