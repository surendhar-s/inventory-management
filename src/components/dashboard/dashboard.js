import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount = () => {
    const isLoggedIn = localStorage.getItem("userId")
    if (localStorage.getItem("userId") === null) {
      this.props.history.replace("/login")
    }
    else {

    }
  }
  render() {
    return (
      <div>
        Dashboard
      </div>
    );
  }
}

export default Dashboard;
