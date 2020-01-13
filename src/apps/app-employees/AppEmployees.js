import React from 'react';
import AuthService from '../../services/AuthService';
import { Redirect } from 'react-router-dom';
import { TopNavbar } from '../../themes/bootstrap4';
import { Row, Col, Container } from 'react-bootstrap';
import { EmployeeList } from './components';

export default class AppEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.renderEmployeeList = this.renderEmployeeList.bind(this);
    
    this.onSelect = this.onSelect.bind(this);

    // Instantiate Service
    this.authService = new AuthService();
  }

  onSelect(employee) {
    console.log(employee);
  }

  renderEmployeeList() {
    return <EmployeeList onSelect={this.onSelect} />
  }

  render() {
    if (!this.authService.isAuthenticated()) {
      return <Redirect to='/' />
    }

    return (
      <React.Fragment>
        <TopNavbar />
        <Container fluid className="mt-4">
          <Row>
            <Col md={9}>
              {this.renderEmployeeList()}
            </Col>
            <Col md={3}>
              World
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}