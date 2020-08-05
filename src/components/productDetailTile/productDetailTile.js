import React, { Component } from 'react';

class ProductDetailTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: "",
      productId: 0,
      productPrice: 0,
      productCategory: "",
      productQuantity: 0,
      productDescription: ""
    }
  }
  componentDidMount = () => {
    this.setState({
      productName: this.props.productName,
      productId: this.props.productId,
      productPrice: this.props.productPrice,
      productCategory: this.props.productCategory,
      productQuantity: this.props.productQuantity,
      productDescription: this.props.productDescription
    })
  }
  render() {
    return (
      <div>
        <p>Name: {this.state.productName}</p>
        <p>Price: {this.state.productPrice}</p>
        <p>Quantity: {this.state.productQuantity}</p>
        <p>Category: {this.state.productCategory}</p>
        <p>Description: {this.state.productDescription}</p>
      </div>
    );
  }
}

export default ProductDetailTile;
