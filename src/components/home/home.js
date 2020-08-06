import React, { Component } from 'react';
import Header from '../header/header';
import './home.css'
import Footer from '../footer/footer';
import ListAllProducts from '../listAllProducts/listAllProducts';
import DummyEmployeeComponent from '../dummyEmployeeComponent/dummyEmployeeComponent';

class Home extends Component {
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
          {/* <ProductDetailTile productName="" id="" productPrice="" productCategory="" productQuantity="" productDescription=""/> */}
          {/* <ProductDetailTile productName={"Sample"} id={100} productPrice={100.0} productCategory={"Fashion"} productQuantity={10} productDescription={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."} /> */}
          {/* <ListAllProducts /> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;