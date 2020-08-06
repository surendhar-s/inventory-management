import React, { Component } from 'react';
import Axios from 'axios';
import MaterialTable from 'material-table';

class ListAllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productsList: [],
      columns: [
        { title: 'Name', field: 'productName' },
        { title: 'In-Stock', field: 'productStock', type: 'numeric' },
        { title: 'Category', field: 'productCategory' },
        { title: 'Price/Unit', field: 'productPrice', type: 'numeric' },
        // { title: 'Description', field: 'productDescription'}
      ]
    }
  }
  componentDidMount = async () => {
    if (!localStorage.getItem("isLoggedIn")) {
      this.props.history.replace("/login")
    }
    else {
      const data = await Axios.get('http://localhost:3001/products');
      this.setState({
        productsList: data.data
      })
    }
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
