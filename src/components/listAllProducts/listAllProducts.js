import React, { Component } from 'react';
import Axios from 'axios';
import MaterialTable from 'material-table';

class ListAllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productsList: [],
      columns: [
        { title: 'Name', field: 'productName', align: 'center' },
        { title: 'In-Stock', field: 'productStock', type: 'numeric', align: 'center' },
        { title: 'Category', field: 'productCategory', align: 'center' },
        { title: 'Price/Unit', field: 'productPrice', type: 'numeric', align: 'center' },
        // { title: 'Description', field: 'productDescription'}
      ]
    }
  }
  componentDidMount = async () => {
    const currentUserId = localStorage.getItem("userId")
    const data = await Axios.get('http://localhost:3001/products?productUserId=' + currentUserId);
    this.setState({
      productsList: data.data
    })
  }
  render() {
    return (
      <div>
        <MaterialTable
          title="Product List"
          columns={this.state.columns}
          data={this.state.productsList}
        />
      </div>
    );
  }
}

export default ListAllProducts;
