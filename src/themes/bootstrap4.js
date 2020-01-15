import React from 'react';
import { Navbar, Alert, Spinner, Nav, ButtonGroup } from "react-bootstrap";


export class TopNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/app-dashboard">
          Etchar Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>{this.props.title}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <ButtonGroup>
        {this.props.renderAction}
        {this.props.renderBack}
        </ButtonGroup>
      </Navbar>
    )
  }
}

export class SanityAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      if (this.props.sanity) {
        return (
          <React.Fragment></React.Fragment>
        );
      } else {
        return (
          <Alert variant="danger">
            This data is invalid, complete the data as soon as possible.
          </Alert>
        );
      }
    }
}

export class AutoSaveStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.show) {
      return (
        <small className="text-muted">
          <Spinner size="sm" animation="border" variant="primary" /> Saving... 
        </small>
      );
    }

    return <React.Fragment></React.Fragment>
  }
}