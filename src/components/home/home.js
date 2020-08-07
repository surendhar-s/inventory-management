import React, { Component } from 'react';
import Header from '../header/header';
import './home.css'
import Footer from '../footer/footer';
import Dashboard from "../dashboard/dashboard";
import ListAll from "../listAllProducts/listAllProducts";
import ListAllProducts from '../listAllProducts/listAllProducts';
import AddOrEditProduct from '../addOrEditProduct/addOrEditProduct';
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDashboardSelected: true,
      isListAllSelected: false,
      isAddProductSelected: false
    }
  }
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
        <Header />
        <div className="main-container">
          <div className="home-button-container">
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: true, isListAllSelected: false, isAddProductSelected: false })}>Dashboard</button>
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: true, isAddProductSelected: false })}>ListAll</button>
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: false, isAddProductSelected: true })}>Add Product</button>
          </div>
          {this.state.isDashboardSelected ? <Dashboard /> : null}
          {this.state.isListAllSelected ? <ListAll /> : null}
          {this.state.isAddProductSelected ? <AddOrEditProduct /> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;