import React, { Component } from 'react';
import Header from '../header/header';
import ProductTile from '../productTile/productTile';

class ListAllProducts extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="prodctTileContainer" style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
        </div>
      </div>
    );
  }
}

export default ListAllProducts;
