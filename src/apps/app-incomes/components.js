import React from 'react';
import { Table, ButtonGroup, Button, Card, Form, Col, Row, Modal } from 'react-bootstrap';

export class List extends React.Component {
  constructor(props) {
    super(props);
  }

  renderIsPublish(isPublish) {
    if (isPublish) {
      return <span className="text-success">published</span>
    }

    return <span className="text-muted">unpublished</span>
  }

  renderIncomes() {
    if (this.props.incomes.length > 0) {
      return (
        <tbody>
          {
            this.props.incomes.map((income, index) => 
              <tr key={index} >
                <td>{income.name}</td>
                <td>{this.renderIsPublish(income.isPublish)}</td>
                <td>
                  <ButtonGroup>
                    <Button 
                      variant="secondary" 
                      onClick={(e) => this.props.onSelectIncome(income)}
                    >
                      Select
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={(e) => this.props.onRemoveIncome(income)}
                    >
                      Remove
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            )
          }
        </tbody>
      );
     }
    return this.renderEmpty();
  }

  renderHead() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Is Published?</th>
          <th>Action</th>
        </tr>
      </thead>
    )
  }

  renderEmpty() {
    return (
      <tbody>
        <tr>
          <td colSpan={3}>Empty</td>
        </tr>
      </tbody>
    )
  }

  render() {
    return (
      <Table>
        {this.renderHead()}
        {this.renderIncomes()}
      </Table>
    )
  }
}


export class Action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    }
  }

  renderFilter() {
    return (
      <Modal.Dialog show={this.state.showFilter} onHide={() => this.setState({showFilter: false})}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>
      </Modal.Dialog>
    )
  }

  render() {
    return (
      <Row>
        <Col>
          <Form.Control onKeyPress={(e) => {
            if (e.key === 'Enter') {
              this.props.onSearchIncome(e.target.value);
            }
          }} placeholder="Search" />
        </Col>
        <Col className="d-flex justify-content-end">
          {this.renderFilter()}
          <ButtonGroup>
            <Button onClick={this.setState({showFilter: true})} variant="secondary">
              Filter
            </Button>
            <Button onClick={this.props.onCreateIncome} variant="secondary">
              New Income
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
}

export class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      isPublish: false
    };
  }

  onSetIncome() {
    this.setState({
      id: this.props.income.id,
      name: this.props.income.name,
      isPublish: this.props.income.isPublish
    });
  }

  render() {
    if (this.props.income) {
      return (
        <Card>
          <Card.Body>
            <Row>
              <Col>
                Name
              </Col>
              <Col>
                <Form.Control 
                  type="text"
                  value={this.state.name} 
                  onChange={(e) => this.setState({name: e.target.value})}
                  onBlur={(e) => this.props.onUpdateIncome({name: this.state.name}, this.state.id)}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    }
  }

  componentDidMount() {
    this.onSetIncome();
  }

  componentDidUpdate(prevProps) {
    if (this.props.income.id !== prevProps.income.id) {
      this.onSetIncome()
    }
  }
}

export class Empty extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Body>
          Income not selected
        </Card.Body>
      </Card>
    );
  }
}