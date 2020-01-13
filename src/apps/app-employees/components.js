import React from 'react';
import { Card, Table } from 'react-bootstrap';
import ServiceEmployee from '../../services/ServiceEmployee';

export class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      count: 0,
      next: undefined,
      previous: undefined
    }

    this.onListEmployee = this.onListEmployee.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.renderItem = this.renderItem.bind(this);
    this.renderHead = this.renderHead.bind(this);

    this.serviceEmployee = new ServiceEmployee();
  }

  onListEmployee() {
    this.serviceEmployee.list()
      .then(response => {
        this.setState({
          employees: response.data.results,
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous
        });
      })
      .catch(err => console.warn(err));
  }

  onSelect(employee) {
    if (this.props.onSelect) {
      this.props.onSelect(employee);
    } 
  }

  renderItem() {
    if (this.state.count === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={4}>Data is empty {this.state.count}</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {
          this.state.employees.map((employee, index) => 
            <tr key={index} onClick={() => this.onSelect(employee)}>
              <td>{employee.employeeCode}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          )
        }
      </tbody>
    );
  }

  renderHead() {
    return (
      <thead>
        <tr>
          <th>Employee Code</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
    )
  }

  render() {
    return (
      <Card>
        <Card.Body>
          Hello
        </Card.Body>
        <Table striped hover>
          {this.renderHead()}
          {this.renderItem()}
        </Table>
      </Card>
    );
  }

  componentDidMount() {
    this.onListEmployee();
  }
}