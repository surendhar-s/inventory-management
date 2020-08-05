import React, { Component } from 'react';

class Dashboard extends Component {
  componentDidMount=()=>{
    if(!localStorage.getItem("isLoggedIn")){
      this.props.history.replace("/login")
    }
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Dashboard;
