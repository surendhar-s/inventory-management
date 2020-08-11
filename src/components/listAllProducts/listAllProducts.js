import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay'
import './listAllProducts.css'

class ListAllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productsList: [],
      searchValue: "",
      initialData: [],
      categoryList: [],
      sortBy: "byName",
      filterBy: "All-Cat",
      isDataLoading: false
    }
  }
  componentDidMount = async () => {
    this.setState({
      isDataLoading: true
    })
    const currentUserId = localStorage.getItem("userId")
    const data = await Axios.get('http://localhost:3001/products?productUserId=' + currentUserId);
    this.setState({
      productsList: data.data,
      initialData: data.data
    }, async () => {
      let categoryList = await Axios.get("http://localhost:3001/category")
      let tempList = []
      this.state.productsList.map((data) => {
        let category = categoryList.data.filter(data1 => data1.id === parseInt(data.productCategory))
        data.productCategoryName = category[0].categoryName
        tempList.push(data)
        return 0
      })
      this.setState({
        productsList: tempList,
        initialData: tempList,
        categoryList: categoryList.data,
        isDataLoading: false
      })
    })
  }
  deleteProduct = async (id) => {
    this.setState({
      isDataLoading: true
    })
    await Axios.delete("http://localhost:3001/products/" + id)
    let data = this.state.productsList.filter(oneData => {
      if (oneData.id !== id) {
        return oneData
      }
      return 0
    })
    this.setState({
      productsList: data,
      isDataLoading: false
    })
  }
  searchData = (e) => {
    this.setState({
      isDataLoading: true
    })
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
        return 0
      })
      this.setState({
        productsList: filteredData
      })
    }
    this.setState({
      isDataLoading: false
    })
  }
  sortData = (e) => {
    this.setState({
      sortBy: e.target.value,
      isDataLoading: true
    }, () => {
      let tempList = this.state.productsList
      if (this.state.sortBy === "byName") {
        let tempList = this.state.productsList
        tempList.sort((a, b) => a.productName.localeCompare(b.productName)
        )
      }
      else if (this.state.sortBy === "byPrice") {
        let tempList = this.state.productsList
        tempList.sort((a, b) => parseFloat(a.productPrice) - parseFloat(b.productPrice)
        )
      }
      else if (this.state.sortBy === "byAvailability") {
        let tempList = this.state.productsList
        tempList.sort((a, b) => parseInt(a.productStock) - parseInt(b.productStock)
        )
      }
      this.setState({
        productsList: tempList,
        isDataLoading: false
      })
    })
  }
  filterDataProductByCategory = (e) => {
    this.setState({
      isDataLoading: true
    })
    let filterBy = e.target.value
    if (filterBy === "All-Cat") {
      this.setState({
        productsList: this.state.initialData,
        isDataLoading: false
      })
    }
    else {
      let tempList = this.state.initialData.filter(data => parseInt(data.productCategory) === parseInt(filterBy))
      this.setState({
        productsList: tempList,
        isDataLoading: false
      })
    }
  }
  render() {
    return (
      <div>
        <div style={{ padding: "10px", margin: "0px 80px" }}>
          <h3>Product List</h3>
          <hr /><br />
          <input className="search-bar" placeholder="Search!!" type="search" onChange={this.searchData} />
          <select onChange={this.sortData} className="sort-by">
            <option disabled>Sort By</option>
            <option value="byName" defaultChecked>Name</option>
            <option value="byPrice">Price</option>
            <option value="byAvailability">Availabiliy</option>
          </select>
          <select className="sort-by" onChange={this.filterDataProductByCategory}>
            <option disabled>Filter by category</option>
            <option value="All-Cat">All Category</option>
            {
              this.state.categoryList.map(data => {
                return <option key={data.id} value={data.id}>{data.categoryName}</option>
              })
            }
          </select>
          <div className="table-container">
            <LoadingOverlay
              active={this.state.isDataLoading}
              spinner
              text='Loading your products...'
            >
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
                          <td className="product-table-td">{new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                          }).format(data.productPrice)
                          }</td>
                          <td className="product-table-td"><Link to={{
                            pathname: "/productDetail",
                            state: { productData: data }
                          }}
                            style={{ textDecoration: "none" }}><button className="button view-button home-button">View</button></Link></td>
                          <td><button className="button delete-button home-button" onClick={() => this.deleteProduct(data.id)}>Delete</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              }
            </LoadingOverlay>
          </div>
        </div>
      </div >
    );
  }
}

export default ListAllProducts;
