import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './listAllProducts.css'

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
  deleteProduct = async (id) => {
    await Axios.delete("http://localhost:3001/products/" + id)
    let data = this.state.productsList.filter(oneData => {
      if (oneData.id !== id) {
        return oneData
      }
    })
    this.setState({
      productsList: data
    })
  }
  render() {
    return (
      <div>
        <div style={{ backgroundImage: "linear-gradient(-225deg, #E3FDF5 50%, #FFE6FA 50%)", padding: "10px", margin:"0px 80px" }}>
          <table border="2" style={{ margin: "auto", textAlign: "center" }}>
            <thead>
              <tr style={{ background: "#d8d8d861" }}>
                <td>Name</td>
                <td>Category</td>
                <td>In-Stock</td>
                <td>Price per Unit</td>
                <td colSpan="2">Action</td>
              </tr>
            </thead>
            <tbody>
              {this.state.productsList.map(data => {
                return (
                  <tr key={data.id}>
                    <td>{data.productName}</td>
                    <td>{data.productCategory}</td>
                    <td>{data.productStock}</td>
                    <td>{data.productPrice}</td>
                    <td><Link to={{
                      pathname: "/productDetail",
                      state: { productData: data }
                    }}
                    style={{textDecoration: "none"}}><button className="button home-button view-button">View</button></Link></td>
                    <td><button className="button home-button delete-button" onClick={() => this.deleteProduct(data.id)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div >
    );
  }
}

export default ListAllProducts;
