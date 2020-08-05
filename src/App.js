import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from "./routers/routers";
import DummyEmployeeComponent from './components/dummyEmployeeComponent/dummyEmployeeComponent';
class App extends Component {
  // generateProducts = (arrayLength) => (minCategory, maxCategory) => (minCost, maxCost) => {
  //   let a = new Array(arrayLength);
  //   for (let i = 0; i < a.length; i++) {
  //     const minCat = minCategory;
  //     const maxCat = maxCategory;
  //     const minPrice = minCost;
  //     const maxPrice = maxCost;
  //     const randomCategory = Math.floor(Math.random() * (+maxCat - +minCat)) + +minCat;
  //     const randomStock = Math.floor((Math.random() * 1000) % 2);
  //     const randomPrice = (Math.random() * (+maxPrice - +minPrice)) + +minPrice;
  //     a[i] = {
  //       "productId": 1000 + i + 1,
  //       "productCategory": `Category ${randomCategory}`,
  //       "productName": `Product ${i + 1}`,
  //       "productStock": !!randomStock,
  //       "productPrice": randomPrice.toFixed(3)
  //     }
  //   }
  //   console.log('Below is your products json array');
  //   console.log(JSON.stringify(a));
  // }
  render() {
    return (
      <div>
        {/* {this.generateProducts(1000)(1, 5)(1000, 4000)} */}
        {/* <DummyEmployeeComponent /> */}
        <Router>
          <Switch>
            {
              Routes.map(({ path, component: C, access }) => {
                return (
                  <Route
                    exact
                    path={path}
                    key={Math.random()}
                    render={props => (
                      <C {...props} />
                    )}
                  />
                )
              })
            }
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
