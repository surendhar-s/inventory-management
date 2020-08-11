import React, { Component } from 'react';
import Axios from 'axios';
import canvasJsReact from '../../canvasJs/canvasjs.react'
import LoadingOverlay from 'react-loading-overlay'
var CanvasJsChart = canvasJsReact.CanvasJSChart

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      chartOption: [],
      isDataLoading: false
    }
    this.chartOption = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title: {
        text: "Products Vs Category"
      },
      axisX: {
        title: "Category"
      },
      axisY: {
        title: "Product in stock"
      },
      data: [{
        type: "bar",
        indexLabel: "{label}: {y}",
        dataPoints: []
      }]
    }
  }
  componentDidMount = async () => {
    this.setState({
      isDataLoading: true
    })
    let produtData = await Axios.get("http://localhost:3001/products?productUserId=" + localStorage.getItem("userId"))
    let categoryList = await Axios.get("http://localhost:3001/category")
    if (produtData.data.length !== 0) {
      let categoryId = await categoryList.data.map(a => parseInt(a.id))
      let categoryName = await categoryList.data.map(a => a.categoryName)
      let productInStock = new Array(categoryName.length).fill(0)
      produtData.data.map(data => {
        let indices = categoryId.findIndex(e => e === parseInt(data.productCategory))
        productInStock[indices] = productInStock[indices] + parseInt(data.productStock)
        return 0
      })
      for (var i = 0; i < categoryName.length; i++) {
        if (productInStock[i] !== 0)
          this.chartOption.data[0].dataPoints.push({ label: categoryName[i], y: productInStock[i] })
      }
      // console.log(this.chartOption);
      this.setState({
        chartOption: this.chartOption
      })
    }
    this.setState({
      isDataLoading: false
    })
  }
  render() {
    return (
      <div>
        <hr />
        <LoadingOverlay
          active={this.state.isDataLoading}
          spinner
          text='Loading your dashboard...'
        >
          {this.chartOption.data[0].dataPoints.length !== 0 ? <div style={{ padding: "15px" }}><CanvasJsChart options={this.state.chartOption} /></div> : <h3 style={{height: "100px", padding: "15px", textAlign: "center"}}>No product in inventory found, please add!!</h3>}
        </LoadingOverlay>
      </div>
    );
  }
}

export default Dashboard;
