import React from 'react';
import { TopNavbar } from '../themes/bootstrap4';
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup } from 'react-bootstrap';
import ServiceIncome from '../services/ServiceIncome';
import { Redirect } from 'react-router-dom';

export default class PageListIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: [],
      income: undefined,
      isRedirectPageDetailIncome: false
    }
    this.serviceIncome = new ServiceIncome();
  }

  onListIncomes() {
    this.serviceIncome.list()
      .then((response) => {
        this.setState({incomes: response.data.results});
      })
      .catch(err => {
        console.warn(err);
      });
  }

  onCreateIncome() {
    this.serviceIncome.create()
      .then((response) => {
        this.setState({
          income: response.data,
          isRedirectPageDetailIncome: true
        });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  onSelectIncome(income) {
    this.setState({
      income: income,
      isRedirectPageDetailIncome: true
    })
  }

  onRemoveIncome(income) {
    const confirm = window.confirm('Are you sure ?');
    if (confirm) {
      this.serviceIncome.remove(income.id)
        .then(response => this.onListIncomes())
        .catch(err => console.warn(err));
    }
  }

  renderRedirectPageDetailIncome() {
    if (this.state.isRedirectPageDetailIncome) {
      return <Redirect to={`/${this.state.income.id}/incomes/`} />
    }
  }

  renderIsPublish(isPublish) {
    if (isPublish) {
      return <span className="text-success">published</span>
    }
    return <span className="text-muted">unpublished</span>
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>Income Name</th>
          <th>Pubslihed?</th>
          <th className="d-flex justify-content-end">Action</th>
        </tr>
      </thead>
    );
  }

  renderListIncome() {
    if (this.state.incomes.length > 0) {
      return (
        <tbody>
          {
            this.state.incomes.map((income, index) => 
              <tr key={index}>
                <td>{income.name}</td>
                <td>{this.renderIsPublish(income.isPublish)}</td>
                <td className="d-flex justify-content-end">
                  <ButtonGroup aria-label="Basic example">
                    <Button onClick={this.onRemoveIncome.bind(this, income)} variant="danger">Remove</Button>
                    <Button onClick={this.onSelectIncome.bind(this, income)} variant="warning">Edit</Button>
                  </ButtonGroup>
                </td>
              </tr>
            )
          }
        </tbody>
      );
    } 

    return (
      <tbody>
        <tr>
          <td colSpan={3}>Empty</td>
        </tr>
      </tbody>
    );
    
  }

  render() {
    return (
      <React.Fragment>
        {this.renderRedirectPageDetailIncome()}
        <TopNavbar title="Incomes" />
        <Container fluid className="mt-4">
          <Row>
            <Col>
              <Form.Control placeholder="search" />
            </Col>
            <Col className="d-flex justify-content-end">
              <Button onClick={this.onCreateIncome.bind(this)} variant="primary">
                New Income
              </Button>
            </Col>
          </Row>
        </Container>
        <Container fluid className="mt-4">
          <Row>
            <Col>
              <Card>
                <Table striped>
                  {this.renderTableHead()}
                  {this.renderListIncome()}
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.onListIncomes();
  }
}