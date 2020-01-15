import React from 'react';
import ServiceIncome from '../services/ServiceIncome';
import { Card, Row, Col, Form, Container, Button } from 'react-bootstrap';
import { TopNavbar } from '../themes/bootstrap4';
import { Redirect, Prompt } from 'react-router-dom';


export default class PageDetailIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      name: '',
      isPublish: false,
      isRenderRedirect: false,
    };

    this.serviceIncome = new ServiceIncome();
  }

  onGetIncome(id) {
    this.serviceIncome.get(id)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          isPublish: response.data.isPublish
        });
      })
  }

  renderEmpty() {
    return <h1>Loading....</h1>
  }

  onHandleName(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  onUpdateName(e) {
    if (this.state.isPublish) {
      alert('This data is published, you can not update! Pleas click edit mode to editing this data!');
      return;
    }
    this.serviceIncome.update(this.state.id, {name: this.state.name})
      .then(response => {
        this.onGetIncome(response.data.id);
      })
  } 

  onPublish() {
    this.serviceIncome.publish(this.state.id)
      .then(response => {
        this.onGetIncome(response.data.id);
      });
  }

  onDraft() {
    this.serviceIncome.draft(this.state.id)
      .then(response => {
        this.onGetIncome(response.data.id);
      });
  }

  renderForm() {
    if (this.state.id) {
      return (
        <Card>
          <Card.Body>
            <Card.Title>Income</Card.Title>
            <Row>
              <Col>Name</Col>
              <Col>
                <Form.Control
                  onChange={this.onHandleName.bind(this)}
                  value={this.state.name}
                  onBlur={this.onUpdateName.bind(this)}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )
    }

    return (
      <Card>
        <Card.Body>
          <Row>
            <Col>Name</Col>
            <Col>
              Loading....
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }

  renderAction() {
    if (!this.state.isPublish) {
      return <Button onClick={this.onPublish.bind(this)}>Publish</Button>
    } else {
      return <Button variant="light" onClick={this.onDraft.bind(this)}>Edit mode</Button>
    }
  }

  renderBack() {
    return <Button variant="secondary" onClick={(e) => this.setState({isRenderRedirect: true})}>Back</Button>
  }

  renderRedirect() {
    if (this.state.isRenderRedirect) {
      return <Redirect to='/incomes/' />
    }
  }
  
  render() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <TopNavbar renderBack={this.renderBack()}  renderAction={this.renderAction()} title="Income"/>
        <Container fluid className="mt-5">
          <Row>
            <Col md={9}>
              {this.renderForm()}
            </Col>
          </Row>
        </Container>

        <Prompt
          when={this.state.isPublish === false}
          message="this data has not been published! Are you sure you want to leave?"
        />
      </React.Fragment>
    ); 
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.onGetIncome(id);
  }
}