import React, { Component } from 'react';
import Header from '../header/header';

class AddOrEditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      quantity: 0,
      pricePerUnit: 0,
      imagePath: "",
      description: ""
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
  render() {
    return (
      <div>
        <Header />
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
              <input className="form-input" type="text" placeholder="Description" onChange={this.setDescription} />
              <br />
              <input className="form-input" type="file" onChange={this.setImage} />
              <br />
              <button className="button log-in" type="submit" onClick={this.handleSubmit}>Add or Edit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddOrEditProduct;
