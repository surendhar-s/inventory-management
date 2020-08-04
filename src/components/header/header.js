import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './header.css'
class Header extends Component {
  render() {
    return (
      <div>
        <div className="navbar-top">
          <div>
            <h2 className="title">Inventory Management</h2>
          </div>
          <div>
            <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: "/login" }}><button className="button logout-button" onClick={this.handleLogout}>Logout</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
