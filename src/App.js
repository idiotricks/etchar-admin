import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppAuth from './apps/app-auth/AppAuth';
import AppDashboard from './apps/app-dashboard/AppDashboard';
import AppEmployees from './apps/app-employees/AppEmployees';
import AppIncome from './apps/app-incomes/AppIncome';
import PageListIncome from './pages/PageListIncome';
import PageDetailIncome from './pages/PageDetailIncome';

function App() {
  return (
    <Router>
      <Route exact path="/" component={AppAuth} />
      <Route path="/app-dashboard" component={AppDashboard} />
      <Route path="/app-employees" component={AppEmployees} />
      <Route path="/incomes" component={PageListIncome} />
      <Route path="/:id/incomes/" component={PageDetailIncome} />
    </Router>
  );
}

export default App;
