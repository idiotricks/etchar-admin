import React from 'react';

import { LoginForm, RegisterForm } from './components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AuthService from '../../services/AuthService';
import { Redirect } from 'react-router-dom';
import './styles.css';

export default class AppAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowRenderRegisterForm: false,
      isRenderRedirect: false
    }

    // Binding method render
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.renderRegisterForm = this.renderRegisterForm.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);

    // Binding method state
    this.setStateIsShowRenderRegisterForm = this.setStateIsShowRenderRegisterForm.bind(this);

    // Binding method emitter
    this.onLoginEmit = this.onLoginEmit.bind(this);
    this.onRegisterEmit = this.onRegisterEmit.bind(this);

    // Instantiate service
    this.authService = new AuthService();
  }

  renderLoginForm() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <Row className="mt-4 d-flex justify-content-center">
          <Col md={3}>
            <LoginForm onLoginEmit={this.onLoginEmit} />
            <p className="text-center mt-3 text-muted">
              Anda belum pernah mendaftar ? daftar sekarang &nbsp;
              <span onClick={this.setStateIsShowRenderRegisterForm} style={{cursor: 'pointer'}} className="text-primary">di sini</span>
            </p>
          </Col>
        </Row>
      </React.Fragment>
    ); 
  }

  renderRegisterForm() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <Row className="mt-4 d-flex justify-content-center">
          <Col md={3}>
            <RegisterForm onRegisterEmit={this.onRegisterEmit} />
            <p className="text-center mt-3 text-muted">
              Sudah punya akun ? Login &nbsp;
              <span
                onClick={this.setStateIsShowRenderRegisterForm}
                style={{cursor: 'pointer'}}
                className="text-primary"
              >
                di sini
              </span> sekarang.
              
            </p>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  renderRedirect() {
    if (this.state.isRenderRedirect) {
      return <Redirect to='/app-dashboard' />
    }
  }

  setStateIsShowRenderRegisterForm() {
    this.setState({isShowRenderRegisterForm: !this.state.isShowRenderRegisterForm});
  }

  onLoginEmit(status, value) {
    if (status) {
      this.authService.setToken(value.data.token);
      this.authService.setUserId(value.data.userId);
      this.authService.setUsername(value.data.username);
      this.authService.setEmail(value.data.email);
      this.authService.saveAuth();
      this.setState({isRenderRedirect: true});
    }
  }

  onRegisterEmit(status, value) {
    if (status) {
      console.log(value);
    }
  }

  render() {
    if (!this.state.isShowRenderRegisterForm) {
      return this.renderLoginForm();
    } else {
      return this.renderRegisterForm();
    }
  }

  componentDidMount() {
    if (this.authService.isAuthenticated()) {
      this.setState({isRenderRedirect: true});
    }
  }
}