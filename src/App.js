import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppAuth from './apps/app-auth/AppAuth';
import AppDashboard from './apps/app-dashboard/AppDashboard';

function App() {
  return (
    <Router>
      <Route exact path="/" component={AppAuth} />
      <Route path="/app-dashboard" component={AppDashboard} />
    </Router>
  );
}

export default App;
