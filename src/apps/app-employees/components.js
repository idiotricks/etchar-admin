import React from 'react';
import { Card, Table, Button, Form, Col, Row, Alert } from 'react-bootstrap';
import ServiceEmployee from '../../services/ServiceEmployee';
import { SanityAlert, AutoSaveStatus } from '../../themes/bootstrap4';

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
    this.onCreateEmployee = this.onCreateEmployee.bind(this);

    this.renderItem = this.renderItem.bind(this);
    this.renderHead = this.renderHead.bind(this);
    this.renderStatusPublished = this.renderStatusPublished.bind(this);

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

  onCreateEmployee() {
    this.serviceEmployee.create()
      .then(response => {
        this.props.onSelect(response.data.id);
      })
  }

  onSelect(e, id) {
    if (this.props.onSelect) {
      this.props.onSelect(id);
    } 
  }

  renderStatusPublished(published) {
    if (!published) {
      return <span className="text-muted">No Published</span>
    }

    return <span className="text-success">Published</span>
  }

  renderItem() {
    if (this.state.count === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={6}>Data is empty {this.state.count}</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {
          this.state.employees.map((employee, index) => 
            <tr key={index} onClick={(e) => this.onSelect(e, employee.id)}>
              <td>{employee.employeeCode}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{this.renderStatusPublished(employee.isPublish)}</td>
              <td>{employee.salary}</td>
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
          <th>Status</th>
          <th>Salary</th>
        </tr>
      </thead>
    )
  }

  render() {
    return (
      <Card>
        <Card.Header>List Of Employee</Card.Header>
        <Card.Body>
          <Row>
            <Col md={9}>
              <Form.Control placeholder="Search employee" />
            </Col>
            <Col className="d-flex justify-content-end" md={3}>
              <Button onClick={this.onCreateEmployee} variant="primary">New Employee</Button>
            </Col>
          </Row>
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


export class EmployeeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeCode: undefined,
      lastName: undefined,
      firstName: undefined,
      email: undefined,
      id: undefined,
      maritalStatus: undefined,
      children: undefined,
      salary: undefined,
      isPublish: undefined,
      isShowRenderForm: false,
      autoSave: false 
    }

    this.onGetEmployee = this.onGetEmployee.bind(this);
    this.onHandleChangeFisrtName = this.onHandleChangeFisrtName.bind(this);
    this.onUpdateFisrtName = this.onUpdateFisrtName.bind(this);
    this.onHandleChangeLastName = this.onHandleChangeLastName.bind(this);
    this.onUpdateLastName = this.onUpdateLastName.bind(this);
    this.onHandleChangeEmail = this.onHandleChangeEmail.bind(this);
    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onHandleChangeMaritalStatus = this.onHandleChangeMaritalStatus.bind(this);
    this.onHandleChangeChildren = this.onHandleChangeChildren.bind(this);
    this.onUpdateChildren = this.onUpdateChildren.bind(this);
    this.onHandleChangeSalary = this.onHandleChangeSalary.bind(this);
    this.onUpdateSalary = this.onUpdateSalary.bind(this);
    this.onSetEmployee = this.onSetEmployee.bind(this);
    this.onAutoSave = this.onAutoSave.bind(this);

    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderStatusPublished = this.renderStatusPublished.bind(this);

    this.serviceEmployee = new ServiceEmployee();
  }

  onSetEmployee(data) {
    this.setState({
      employeeCode: data.employeeCode,
      id: data.id,
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      isPublish: data.isPublish,
      maritalStatus: data.maritalStatus,
      children: data.children,
      salary: data.salary,
      sanity: data.sanity,
    });
  }

  onGetEmployee() {
    if (this.props.id) {
      this.serviceEmployee.get(this.props.id)
        .then(response => {
          this.onSetEmployee(response.data);
        })
        .catch(err => console.warn(err));
    }
  }

  onAutoSave() {
    this.setState({autoSave: true});
    window.setTimeout(() => {
      this.setState({
        autoSave: false
      });
    }, 1000);
  }

  onHandleChangeFisrtName(e) {
    e.preventDefault();
    this.setState({firstName: e.target.value});
  }

  onUpdateFisrtName() {
    this.serviceEmployee.update(this.state.id, {firstName: this.state.firstName})
      .then(response => {
        this.serviceEmployee.sanity(this.state.id)
          .then(response => {
            this.onSetEmployee(response.data);
            this.props.onRefreshComponent();
            this.onAutoSave();
          })
      })
  }

  onHandleChangeLastName(e) {
    e.preventDefault();
    this.setState({lastName: e.target.value});
  }

  onUpdateLastName() {
    this.serviceEmployee.update(this.state.id, {lastName: this.state.lastName})
      .then(response => {
        this.serviceEmployee.sanity(this.state.id)
          .then(response => {
            this.onSetEmployee(response.data);
            this.props.onRefreshComponent();
            this.onAutoSave();
          })
      })
  }

  onHandleChangeEmail(e) {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  onUpdateEmail() {
    this.serviceEmployee.update(this.state.id, {email: this.state.email})
      .then(response => {
        this.serviceEmployee.sanity(this.state.id)
          .then(response => {
            this.onSetEmployee(response.data);
            this.props.onRefreshComponent();
            this.onAutoSave();
          })
      })
  }

  onHandleChangeMaritalStatus(e) {
    e.preventDefault();
    this.setState({maritalStatus: e.target.value});
    this.serviceEmployee.update(this.state.id, {maritalStatus: e.target.value})
      .then(response => {
        this.serviceEmployee.sanity(this.state.id)
          .then(response => {
            this.onSetEmployee(response.data);
            this.props.onRefreshComponent();
            this.onAutoSave();
          })
      });
  }

  onHandleChangeChildren(e) {
    e.preventDefault();
    this.setState({children: e.target.value});
  }

  onUpdateChildren() {
    this.serviceEmployee.update(this.state.id, {children: this.state.children})
      .then(response => {
        this.serviceEmployee.sanity(this.state.id)
          .then(response => {
            this.onSetEmployee(response.data);
            this.props.onRefreshComponent();
            this.onAutoSave();
          })
      });
  }

  onHandleChangeSalary(e) {
    e.preventDefault();
    this.setState({salary: e.target.value});
  }

  onUpdateSalary() {
    this.serviceEmployee.update(this.state.id, {salary: this.state.salary})
      .then(response => {
        this.serviceEmployee.sanity(this.state.id)
          .then(response => {
            this.onSetEmployee(response.data);
            this.props.onRefreshComponent();
            this.onAutoSave();
          })
      });
  }

  renderEmpty() {
    return (
      <Card>
        <Card.Header>Employee</Card.Header>
        <Card.Body>
          No Selected Employee
        </Card.Body>
      </Card>
    );
  }

  renderStatusPublished(published) {
    if (!published) {
      return <span className="text-muted">No Published</span>
    }

    return <span className="text-success">Published</span>
  }

  renderForm() {
    return (
      <Card>
        <Card.Header>Employee <AutoSaveStatus show={this.state.autoSave} /> </Card.Header>
        <Card.Body>
          <SanityAlert sanity={this.state.isPublish} />
          <Row className="mt-2">
            <Col>Employee Code</Col>
            <Col>{this.state.employeeCode}</Col>
          </Row>
          <Row className="mt-2">
            <Col>Fisrt Name</Col>
            <Col>
              <Form.Control 
                value={this.state.firstName} 
                onBlur={this.onUpdateFisrtName} 
                onChange={this.onHandleChangeFisrtName}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>Last Name</Col>
            <Col>
              <Form.Control 
                value={this.state.lastName} 
                onBlur={this.onUpdateLastName}
                onChange={this.onHandleChangeLastName}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>Email</Col>
            <Col>
              <Form.Control 
                value={this.state.email} 
                onBlur={this.onUpdateEmail} 
                onChange={this.onHandleChangeEmail}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>Marital Status</Col>
            <Col>
              <Form.Control 
                onChange={this.onHandleChangeMaritalStatus} 
                value={this.state.maritalStatus} 
                as="select"
              >
                <option value='married'>Married</option>
                <option value='single'>Single</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>Childs</Col>
            <Col>
              <Form.Control 
                value={this.state.children} 
                onBlur={this.onUpdateChildren} 
                onChange={this.onHandleChangeChildren}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>Salary</Col>
            <Col>
              <Form.Control 
                value={this.state.salary} 
                onBlur={this.onUpdateSalary} 
                onChange={this.onHandleChangeSalary}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  render() {
    if (!this.state.id) {
      return this.renderEmpty();
    }
    return this.renderForm();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.onGetEmployee();
    }
  }
}

