import React from 'react';
import { Navbar } from "react-bootstrap";


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