import React from 'react';
import etchar from '../../etchar.png';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import ServiceUser from '../../services/ServiceUser';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isShowRenderAlert: false,
    }

    this.onLogin = this.onLogin.bind(this);
    this.serviceUser = new ServiceUser();

    this.renderAlert = this.renderAlert.bind(this);
  }

  onLogin() {
    if (this.props.onLoginEmit) {
      this.setState({isShowRenderAlert: false});
      this.serviceUser.authLogin(this.state.username, this.state.password)
        .then(response => {
          this.props.onLoginEmit(true, response);
        })
        .catch(err => {
          this.setState({isShowRenderAlert: true});
          this.props.onLoginEmit(false, err);
        });
    }
  }

  renderAlert() {
    if (this.state.isShowRenderAlert) {
      return (
        <Alert variant='warning'>
          Login gagal, silahkan coba lagi.
        </Alert>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <Card.Img src={etchar} variant="top" />
          <Card.Body>
            {this.renderAlert()}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onBlur={(e) => this.setState({username: e.target.value})}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onBlur={(e) => this.setState({password: e.target.value})}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Button onClick={this.onLogin} variant="primary" block size="lg">Login</Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}


export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      isShowRenderAlert: '',
    };

    // Binding method common
    this.onRegister = this.onRegister.bind(this);

    // Binding method render
    this.renderAlert = this.renderAlert.bind(this);

    // Instantiate service
    this.serviceUser = new ServiceUser();

  }

  onRegister() {
    console.log(this.props.onRegisterEmit);
    if (this.props.onRegisterEmit) {
      this.setState({isShowRenderAlert: false});
      this.serviceUser.authRegister(
        this.state.username,
        this.state.email,
        this.state.password
      )
      .then(response => {
        this.props.onRegisterEmit(true, response);
      })
      .catch(err => {
        this.setState({isShowRenderAlert: true});
        this.props.onRegisterEmit(true, err);
      });
    }
  }

  renderAlert() {
    if (this.state.isShowRenderAlert) {
      return (
        <Alert variant='warning'>
          Register gagal, silahkan coba lagi.
        </Alert>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <Card.Img src={etchar} variant="top" />
          <Card.Body>
            {this.renderAlert()}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onBlur={(e) => this.setState({username: e.target.value})}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onBlur={(e) => this.setState({email: e.target.value})}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onBlur={(e) => this.setState({password: e.target.value})}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Button key={2} onClick={this.onRegister} variant="primary" block size="lg">Register</Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}