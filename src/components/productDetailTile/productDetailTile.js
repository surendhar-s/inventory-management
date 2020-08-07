import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class ProductDetailTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: "",
      id: 0,
      productPrice: 0,
      productCategory: "",
      productStock: 0,
      productDescription: "",
      isEditable: false
    }
    this.intialStateValues = {
      initalProductName: this.props.location.state.productData.productName,
      initalPd: this.props.location.state.productData.id,
      initalProductPrice: this.props.location.state.productData.productPrice,
      initalProductCategory: this.props.location.state.productData.productCategory,
      initalproductStock: this.props.location.state.productData.productStock,
      initalProductDescription: this.props.location.state.productData.productDescription
    }
  }
  componentDidMount = () => {
    // console.log(this.props.location.state);
    this.setState({
      productName: this.props.location.state.productData.productName,
      id: this.props.location.state.productData.id,
      productPrice: this.props.location.state.productData.productPrice,
      productCategory: this.props.location.state.productData.productCategory,
      productStock: this.props.location.state.productData.productStock,
      productDescription: this.props.location.state.productData.productDescription
    })
  }

  toggleEditable = () => {
    this.setState({
      isEditable: true
    })
  }
  setNameValue = (e) => {
    this.setState({ productName: e.target.value })
  }
  setQuantity = (e) => {
    this.setState({ productStock: e.target.value })
  }
  setDescription = (e) => {
    this.setState({ productDescription: e.target.value })
  }
  setPricePerUnit = (e) => {
    this.setState({ productPrice: e.target.value })
  }
  editData = async () => {
    let data = await Axios.put("http://localhost:3001/products/" + this.state.id, {
      productCategory: this.state.productCategory,
      productName: this.state.productName,
      productStock: this.state.productStock,
      productPrice: this.state.productPrice,
      productDescription: this.state.productDescription,
      productUserId: localStorage.getItem("userId")
    })
    this.setState({
      productName: data.data.productName,
      productStock: data.data.productStock,
      productPrice: data.data.productPrice,
      productDescription: data.data.productDescription,
    })
  }
  cancelEdit = () => {
    this.setState({
      productName: this.intialStateValues.initalProductName,
      productPrice: this.intialStateValues.initalProductPrice,
      productStock: this.intialStateValues.initalproductStock,
      productDescription: this.intialStateValues.initalProductDescription,
      isEditable: false
    })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="main-container">
          {this.state.isEditable ? <div>
            <p>Edit Details</p>
            <label>Name: </label>
            <input type="text" defaultValue={this.intialStateValues.initalProductName} onChange={this.setNameValue} />
            <br />
            <label>Price per Unit: </label>
            <input type="numeber" defaultValue={this.intialStateValues.initalProductPrice} onChange={this.setPricePerUnit} />
            <br />
            <label>Quantity: </label>
            <input type="number" defaultValue={this.intialStateValues.initalproductStock} onChange={this.setQuantity} />
            <br />
            <label>Descrption: </label>
            <input type="text" defaultValue={this.intialStateValues.initalProductDescription} onChange={this.setDescription} />
            <br />
            <button onClick={this.editData}><span>Save</span></button>
            <button onClick={this.cancelEdit}>Cancel</button>
          </div> : <div>
              <p>Name: {this.state.productName}</p>
              <p>Price: {this.state.productPrice}</p>
              <p>Quantity: {this.state.productStock}</p>
              <p>Category: {this.state.productCategory}</p>
              <p>Description: {this.state.productDescription}</p>
              <button onClick={this.toggleEditable}><span>Edit</span></button>
              <Link to="/"><button>Back</button></Link>
            </div>
          }
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProductDetailTile;
