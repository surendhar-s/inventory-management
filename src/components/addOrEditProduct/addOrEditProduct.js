import React, { Component } from 'react';
import './addOrEditProduct.css'
import Axios from 'axios';
import moment from 'moment'

class AddOrEditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      quantity: 0,
      pricePerUnit: 0,
      imagePath: "",
      description: "",
      category: "",
      categoryList: [],
      newCategorty: "",
      addNewCategoryEnabled: false,
      errors: {
        name: ' ',
        quantity: ' ',
        price: ' ',
        description: ' ',
      },
    }
  }
  setErrorFiled = (fieldName, filedValue) => {
    let errors = this.state.errors
    switch (fieldName) {
      case 'name':
        errors.name = filedValue === "" ? 'Product name should not be empty' : ''
        break;
      case 'price':
        errors.price = filedValue === "" || parseFloat(filedValue) <= 0 ? 'Price should be greater than 0' : ''
        break;
      case 'quantity':
        errors.quantity = filedValue === "" || parseInt(filedValue) <= 0 ? 'Quantity should be greater than or equal to 1' : ''
        break;
      case 'description':
        errors.description = filedValue.length <= 9 ? 'Description should have minimum of 10 character' : ''
        break;
      default:
        break;
    }
    this.setState({ errors, [fieldName]: filedValue });
  }
  setNameValue = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setState({ name: e.target.value })
  }
  setQuantity = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setState({ quantity: e.target.value })
  }
  setDescription = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setState({ description: e.target.value })
  }
  setPricePerUnit = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setState({ pricePerUnit: e.target.value })
  }
  setImage = (e) => {
    this.setErrorFiled(e.target.name, e.target.value)
    this.setImage({ imagePath: e.target.value })
  }
  componentDidMount = async () => {
    await this.fetchCategory()
  }
  setCategory = (e) => {
    this.setState({
      category: e.target.value
    })
  }
  fetchCategory = async () => {
    let categoryList = await Axios.get("http://localhost:3001/category")
    this.setState({
      categoryList: categoryList.data
    })
  }
  handleSubmit = () => {
    Axios.post("http://localhost:3001/products", {
      productCategory: this.state.category,
      productName: this.state.name,
      productStock: this.state.quantity,
      productPrice: this.state.pricePerUnit,
      productDescription: this.state.description,
      productAddedOn: moment(),
      productUpdatedOn: null,
      productUserId: localStorage.getItem("userId")
    })
    this.props.callBackFunctionToHome()
  }
  cancelAddingProduct = () => {
    this.props.callBackFunctionToHome()
  }
  setNewCategoryValue = (e) => {
    this.setState({
      newCategorty: e.target.value
    })
  }
  toggleAddingCategory = () => {
    this.setState({
      addNewCategoryEnabled: !this.state.addNewCategoryEnabled
    })
  }
  validateForm = () => {
    if (this.state.errors.name === "" &&
      this.state.errors.price === "" &&
      this.state.errors.description === "" &&
      this.state.errors.quantity === "") {
      return false
    }
    else {
      return true
    }
  }
  render() {
    const { errors } = this.state
    let isSubmissionDisabled = this.validateForm()
    return (
      <div>
        <hr />
        {/* <Header /> */}
        {/* <div className="main-contianer"> */}
        <div className="add-product-container">
          <div className="con">
            <header className="head-form login-header">
              <p>Add or Edit Product details</p>
            </header>
            <br />
            <div>
              <input className="form-input" type="text" placeholder="Name" name="name" onChange={this.setNameValue} required />
              <br />
              {errors.name.length > 0 && <div className="error-container"><span className='error'>{errors.name}</span></div>}
              <input className="form-input" type="number" placeholder="Quantity" name="quantity" onChange={this.setQuantity} required />
              <br />
              {errors.quantity.length > 0 && <div className="error-container"><span className='error'>{errors.quantity}</span></div>}
              <input className="form-input" type="number" placeholder="Price per unit" name="price" onChange={this.setPricePerUnit} required />
              <br />
              {errors.price.length > 0 && <div className="error-container"><span className='error'>{errors.price}</span></div>}
              <select className="select-option" onChange={this.setCategory}>
                <option disabled>---Select category---</option>
                {
                  this.state.categoryList.map(category => {
                    return <option key={category.id} value={category.id}>{category.categoryName}</option>
                  })
                }
              </select>
              <br />
              <button style={{ display: "block", margin: "auto" }} onClick={this.toggleAddingCategory}>Click to add new category</button>
              {
                this.state.addNewCategoryEnabled ? <div><input className="form-input" type="text" onChange={this.setNewCategoryValue} /><button className="button" style={{ width: "unset", background: "rgb(181 147 147)", margin: "0px auto 20px" }}>Add Category</button></div> : null
              }
              <input className="form-input" type="text" placeholder="Description" name="description" onChange={this.setDescription} />
              {errors.description.length > 0 && <div className="error-container"><span className='error'>{errors.description}</span></div>}
              <br />
              {/* <input className="form-input" type="file" onChange={this.setImage} />
              <br /> */}
              <div className="button-holder">
                <button className="operational-button" type="submit" onClick={this.handleSubmit} disabled={isSubmissionDisabled}>Add</button>
                <button className="operational-button" type="submit" onClick={this.cancelAddingProduct}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/*  <Footer /> */}
      </div>
    );
  }
}

export default AddOrEditProduct;
