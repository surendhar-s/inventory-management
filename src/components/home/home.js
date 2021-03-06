import React, { Component } from 'react';
import Header from '../header/header';
import './home.css'
import Footer from '../footer/footer';
import Dashboard from "../dashboard/dashboard";
import ListAll from "../listAllProducts/listAllProducts";
import AddOrEditProduct from '../addOrEditProduct/addOrEditProduct';
import { withRouter } from 'react-router-dom';
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDashboardSelected: true,
      isListAllSelected: false,
      isAddProductSelected: false,
      forceUpadeEnabledForListAll: false
    }
  }
  componentDidMount = () => {
    // console.log(localStorage.getItem("userId"));
    if (localStorage.getItem("userId") === null) {
      this.props.history.replace("/login")
    }
  }
  gotCallBackFromAddProduct = () => {
    this.setState({
      isDashboardSelected: false,
      isListAllSelected: true,
      isAddProductSelected: false,
      forceUpadeEnabledForListAll: true
    })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="main-container">
          <div className="home-button-container">
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: true, isListAllSelected: false, isAddProductSelected: false, forceUpadeEnabledForListAll: false })}>Dashboard</button>
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: true, isAddProductSelected: false, forceUpadeEnabledForListAll: false })}>ListAll</button>
            <button className="button home-button" onClick={() => this.setState({ isDashboardSelected: false, isListAllSelected: false, isAddProductSelected: true, forceUpadeEnabledForListAll: false })}>Add Product</button>
          </div>
          {this.state.isDashboardSelected ? <Dashboard /> : null}
          {this.state.isListAllSelected ? <ListAll forceUpadeEnabled={this.state.forceUpadeEnabledForListAll} /> : null}
          {this.state.isAddProductSelected ? <AddOrEditProduct callBackFunctionToHome={this.gotCallBackFromAddProduct} /> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);