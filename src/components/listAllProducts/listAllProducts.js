import React, { Component } from 'react';
import Axios from 'axios';
import ProductTile from "../productTile/productTile"

class ListAllProducts extends Component {
  constructor(props){
    super(props)
    this.state = {
      productsList: []
    }
  }
  componentDidMount=async()=>{
    if(!localStorage.getItem("isLoggedIn")){
      this.props.history.replace("/login")
    }
    else{
      const data = await Axios.get('/staticFiles/products.json');
      this.setState({
        productsList: data.data
      })
    }
  }
  render() {
    return (
      <div>
        <div className="prodctTileContainer" style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          {
            this.state.productsList.map(data => {
              return <ProductTile key={data.productsId} data={data}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default ListAllProducts;
