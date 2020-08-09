import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './listAllProducts.css'

class ListAllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productsList: [],
      searchValue: "",
      initialData: [],
      categoryList: [],
      sortBy: "byName"
    }
  }
  componentDidMount = async () => {
    const currentUserId = localStorage.getItem("userId")
    const data = await Axios.get('http://localhost:3001/products?productUserId=' + currentUserId);
    this.setState({
      productsList: data.data,
      initialData: data.data
    }, async () => {
      let categoryList = await Axios.get("http://localhost:3001/category")
      let tempList = []
      this.state.productsList.map((data, index) => {
        let category = categoryList.data.filter(data1 => data1.id == data.productCategory)
        data.productCategoryName = category[0].categoryName
        tempList.push(data)
      })
      this.setState({
        productsList: tempList,
        initialData: tempList,
        categoryList: categoryList
      })
    })
  }
  // shouldComponentUpdate = async () => {
  //   const currentUserId = localStorage.getItem("userId")
  //   const data = await Axios.get('http://localhost:3001/products?productUserId=' + currentUserId);
  //   this.setState({
  //     productsList: data.data,
  //     initialData: data.data
  //   })
  // }
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
  setSearchValue = (e) => {
    let inputValue = e.target.value
    if (inputValue === "") {
      this.setState({
        productsList: this.state.initialData
      })
    }
    else {
      let filteredData = this.state.productsList.filter(data => {
        if (data.productName.toUpperCase().includes(inputValue.toUpperCase()) || data.productDescription.toUpperCase().includes(inputValue.toUpperCase())) {
          return data
        }
      })
      this.setState({
        productsList: filteredData
      })
    }
  }
  sortData = (e) => {
    this.setState({
      sortBy: e.target.value
    }, () => {
      let tempList = this.state.productsList
      if (this.state.sortBy === "byName") {
        tempList.sort(function (a, b) {
          return a.productName.localeCompare(b.productName)
        })
      }
      else if (this.state.sortBy === "byPrice") {
        let tempList = this.state.productsList
        tempList.sort(function (a, b) {
          return parseFloat(a.productPrice) - parseFloat(b.productPrice)
        })
      }
      else if (this.state.sortBy === "byAvailability") {
        let tempList = this.state.productsList
        tempList.sort(function (a, b) {
          return parseInt(a.productStock) - parseInt(b.productStock)
        })
      }
      this.setState({
        productsList: tempList
      })
    })
  }
  render() {
    return (
      <div>
        <div style={{ padding: "10px", margin: "0px 80px" }}>
          <h3>Product List</h3>
          <hr /><br />
          <input className="search-bar" placeholder="Search!!" type="search" onChange={this.setSearchValue} />
          <select onChange={this.sortData} className="sort-by">
            <option disabled>Sort By</option>
            <option value="byName" defaultChecked>Name</option>
            <option value="byPrice">Price</option>
            {/* <option value="byCategory">Category</option> */}
            <option value="byAvailability">Availabiliy</option>
          </select>
          {/* <div style={{ backgroundImage: "linear-gradient(-225deg, #E3FDF5 50%, #FFE6FA 50%)", padding: "10px", margin:"0px 80px" }}> */}
          <div className="table-container">
            {
              this.state.productsList.length === 0 ? <h3><span>No product in inventory</span></h3> : <table className="product-table">
                <thead>
                  <tr className="product-table-tr" style={{ background: "#d8d8d861" }}>
                    <th className="product-table-th">Name</th>
                    <th className="product-table-th">Category</th>
                    <th className="product-table-th">In-Stock</th>
                    <th className="product-table-th">Price per Unit</th>
                    <th className="product-table-th" colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.productsList.map(data => {
                    return (
                      <tr className="product-table-tr" key={data.id}>
                        <td className="product-table-td">{data.productName}</td>
                        <td className="product-table-td">{data.productCategoryName}</td>
                        <td className="product-table-td">{data.productStock}</td>
                        <td className="product-table-td">{data.productPrice}</td>
                        <td className="product-table-td"><Link to={{
                          pathname: "/productDetail",
                          state: { productData: data }
                        }}
                          style={{ textDecoration: "none" }}><button className="button home-button view-button">View</button></Link></td>
                        <td><button className="button home-button delete-button" onClick={() => this.deleteProduct(data.id)}>Delete</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div >
    );
  }
}

export default ListAllProducts;
