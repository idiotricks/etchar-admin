import React from 'react';
import AuthService from '../../services/AuthService';
import { Redirect } from 'react-router-dom';
import { TopNavbar, ShortcutAppEmployee, ShortcutAppConfig } from './components';
import { Container, Row, Col, Image } from 'react-bootstrap';
import etchardashboard from '../../etchardashboard.PNG';
import './styles.css';

export default class AppDashboard extends React.Component {
  constructor(props) {
    super(props);

    // Instantiate Service
    this.authService = new AuthService();
  }

  render() {
    if (!this.authService.isAuthenticated()) {
      return <Redirect to='/' />
    }

    return (
      <React.Fragment>
        <TopNavbar />
        <Container className="mt-4">
          <Row className="d-flex justify-content-center">
            <Col md={6} className="d-flex justify-content-center">
              <Image src={etchardashboard} />
            </Col>
          </Row>
        </Container>
        <Container className="mt-4">
          <Row className="d-flex justify-content-center">
            <Col md={2}>
              <ShortcutAppEmployee />
            </Col>
            <Col md={2}>
              <ShortcutAppConfig />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}