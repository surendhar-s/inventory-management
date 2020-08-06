import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from "./routers/routers";
import { LoremIpsum } from "lorem-ipsum";
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
  //     const randomStock = Math.floor((Math.random() * 1000));
  //     const randomPrice = (Math.random() * (+maxPrice - +minPrice)) + +minPrice;
  //     const getLoremIpum=()=>{
  //       const lorem = new LoremIpsum({
  //         sentencesPerParagraph: {
  //           max: 8,
  //           min: 4
  //         },
  //         wordsPerSentence: {
  //           max: 16,
  //           min: 4
  //         }
  //       })
  //       return lorem.generateSentences(3);
  //     }
  //     a[i] = {
  //       "id": 1000 + i + 1,
  //       "productCategory": `Category ${randomCategory}`,
  //       "productName": `Product ${i + 1}`,
  //       "productStock": randomStock,
  //       "productPrice": randomPrice.toFixed(2),
  //       "productDescription": getLoremIpum()
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
