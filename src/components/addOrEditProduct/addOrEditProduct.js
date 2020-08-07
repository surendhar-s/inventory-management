import React, { Component } from 'react';
import './addOrEditProduct.css'
import Axios from 'axios';

class AddOrEditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      quantity: 0,
      pricePerUnit: 0,
      imagePath: "",
      description: "",
      category: ""
    }
  }
  setNameValue = (e) => {
    this.setState({ name: e.target.value })
  }
  setQuantity = (e) => {
    this.setState({ quantity: e.target.value })
  }
  setDescription = (e) => {
    this.setState({ description: e.target.value })
  }
  setPricePerUnit = (e) => {
    this.setState({ pricePerUnit: e.target.value })
  }
  setImage = (e) => {
    this.setImage({ imagePath: e.target.value })
  }
  componentDidMount = () => {
    const isLoggedIn = localStorage.getItem("userId")
    if (localStorage.getItem("userId") === null) {
      this.props.history.replace("/login")
    }
    else {

    }
  }
  setCategory = (e) => {
    this.setState({
      category: e.target.value
    })
  }
  handleSubmit = () => {
    Axios.post("http://localhost:3001/products", {
      productCategory: this.state.category,
      productName: this.state.name,
      productStock: this.state.quantity,
      productPrice: this.state.pricePerUnit,
      productDescription: this.state.description,
      productUserId: localStorage.getItem("userId")
    })
    // this.props.history.replace('/')
  }
  cancelAddingProduct = () => {
    // this.props.history.goBack()
  }
  render() {
    return (
      <div>
        {/* <Header /> */}
        {/* <div className="main-contianer"> */}
        <div className="form-container">
          <div className="con">
            <header className="head-form login-header">
              <p>Add or Edit Product details</p>
            </header>
            <br />
            <div>
              <input className="form-input" type="text" placeholder="Name" onChange={this.setNameValue} required />
              <br />
              <input className="form-input" type="number" placeholder="Quantity" onChange={this.setQuantity} required />
              <br />
              <input className="form-input" type="number" placeholder="Price per unit" name="price" onChange={this.setPricePerUnit} required />
              <br />
              <select className="select-option" onChange={this.setCategory}>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
                <option value="category4">Category 4</option>
              </select>
              <input className="form-input" type="text" placeholder="Description" onChange={this.setDescription} />
              <br />
              {/* <input className="form-input" type="file" onChange={this.setImage} />
              <br /> */}
              <button className="button log-in" type="submit" onClick={this.handleSubmit}>Add</button>
              <button className="button" type="submit" onClick={this.cancelAddingProduct}>Cancel</button>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/*  <Footer /> */}
      </div>
    );
  }
}

export default AddOrEditProduct;
