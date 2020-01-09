import React from 'react';
import { Card, Navbar, Button } from "react-bootstrap";

export class TopNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/app-dashboard">
          Etchar Admin
        </Navbar.Brand>
      </Navbar>
    )
  }
}

export class ShortcutAppEmployee extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Img className="p-4" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/10217013321529659193-128.png" variant="top" />
        <Card.Body className="text-center">
        <h5>App Employees</h5>
        {/* <Button className="mt-4" variant="primary" block>Open</Button> */}
        </Card.Body>
      </Card>
    );
  }
}

export class ShortcutAppConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Img className="p-4" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1719328971552644366-128.png" variant="top" />
        <Card.Body className="text-center">
          <h5>App Configuration</h5>
          {/* <Button className="mt-4" variant="primary" block>Open</Button> */}
        </Card.Body>
      </Card>
    );
  }
}