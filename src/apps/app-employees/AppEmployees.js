import React from 'react';
import AuthService from '../../services/AuthService';
import { Redirect } from 'react-router-dom';
import { TopNavbar } from '../../themes/bootstrap4';
import { Row, Col, Container } from 'react-bootstrap';
import { EmployeeList, EmployeeDetail } from './components';

export default class AppEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeId: undefined,
    }

    this.refEmployeeList = React.createRef();
    this.refEmployeeDetail = React.createRef();

    this.renderEmployeeList = this.renderEmployeeList.bind(this);
    
    this.onSelect = this.onSelect.bind(this);
    this.onRefreshComponent = this.onRefreshComponent.bind(this);

    // Instantiate Service
    this.authService = new AuthService();
  }

  onRefreshComponent() {
    this.refEmployeeList.current.onListEmployee();
    this.refEmployeeDetail.current.onGetEmployee();
  }

  onSelect(employeeId) {
    this.setState({employeeId: employeeId});
  }

  renderEmployeeList() {
    return <EmployeeList ref={this.refEmployeeList} onSelect={this.onSelect} />
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
            <Col md={7}>
              {this.renderEmployeeList()}
            </Col>
            <Col md={5}>
              <EmployeeDetail 
                onRefreshComponent={this.onRefreshComponent} 
                id={this.state.employeeId} 
                ref={this.refEmployeeDetail}
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}