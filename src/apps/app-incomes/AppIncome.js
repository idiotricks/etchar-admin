import React from 'react';
import { TopNavbar } from '../../themes/bootstrap4';
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup } from 'react-bootstrap';
import ServiceIncome from '../../services/ServiceIncome';
import { List, Action, Detail, Empty } from './components';

export default class PageListIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: [],
      income: undefined,
      search: ''
    }
    this.serviceIncome = new ServiceIncome();
  }

  onSanityIncome(id) {
    this.serviceIncome.sanity(id)
      .then(response => {
        this.setState({income: response.data});
        this.onListIncomes();
      })
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

  onSearchIncome(q) {
    this.serviceIncome.search({search: q})
      .then(response => {
        this.setState({incomes: response.data.results});
      });
  }

  onCreateIncome() {
    this.serviceIncome.create()
      .then((response) => {
        this.onSanityIncome(response.data.id);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  onRemoveIncome(income) {
    const confirm = window.confirm('Are you sure ?');
    if (confirm) {
      this.setState({income: undefined});
      this.serviceIncome.remove(income.id)
        .then(response => this.onListIncomes())
        .catch(err => console.warn(err));
    }
  }

  onSelectIncome(income) {
    this.serviceIncome.get(income.id)
      .then(response => {
        this.setState({income: income})
      });
  }

  onUpdateIncome(data, id) {
    this.serviceIncome.update(data, id)
      .then(response => {
        this.onSanityIncome(id);
      })
  }

  renderIncome() {
    if (this.state.income) {
      return (
        <Col>
          <Detail onUpdateIncome={this.onUpdateIncome.bind(this)} income={this.state.income} />
        </Col>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <TopNavbar />
        <Container fluid className="mt-4">
          <Action onSearchIncome={this.onSearchIncome.bind(this)} onCreateIncome={this.onCreateIncome.bind(this)} />
        </Container>
        <Container fluid className="mt-4">
          <Row>
            <Col>
              <Card>
                <List
                  onSelectIncome={this.onSelectIncome.bind(this)}
                  incomes={this.state.incomes}
                  onRemoveIncome={this.onRemoveIncome.bind(this)}
                />
              </Card>
            </Col>
            {this.renderIncome()}
          </Row>
        </Container>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.onListIncomes();
  }
}