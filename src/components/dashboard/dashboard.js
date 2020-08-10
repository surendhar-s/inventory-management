import React, { Component } from 'react';
import Axios from 'axios';
import canvasJsReact from '../../canvasJs/canvasjs.react'
var CanvasJsChart = canvasJsReact.CanvasJSChart

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      chartOption: []
    }
    this.chartOption = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title: {
        text: "Products Vs Category"
      },
      data: [{
        type: "bar",
        indexLabel: "{label}: {y}",
        dataPoints: []
      }]
    }
  }
  componentDidMount = async () => {
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
        this.chartOption.data[0].dataPoints.push({ label: categoryName[i], y: productInStock[i] })
      }
      // console.log(this.chartOption);
      this.setState({
        chartOption: this.chartOption
      })
    }
  }
  render() {
    return (
      <div>
        <hr />
        {this.chartOption.data[0].dataPoints.length !== 0 ? <div style={{ padding: "15px" }}><CanvasJsChart options={this.state.chartOption} /></div> : <h3>Add product in inventory</h3>}
      </div>
    );
  }
}

export default Dashboard;
