import React, { Component } from 'react';
import Axios from 'axios';

class DummyEmployeeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employeeData: []
    }
  }
  componentDidMount = async () => {
    const data = await Axios.get("http://dummy.restapiexample.com/api/v1/employees")
    console.log(data.data.data);
    this.setState({
      employeeData: data.data.data
    })
  }
  render() {
    return (
      <div>
        <h2>Employee Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employeeData.map(data => {
              return (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.employee_name}</td>
                  <td>{data.employee_age}</td>
                  <td>{data.employee_salary}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DummyEmployeeComponent;
