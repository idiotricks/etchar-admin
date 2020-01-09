import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppAuth from './apps/app-auth/AppAuth';

function App() {
  return (
    <Router>
      <Route exact path="/" component={AppAuth} />
    </Router>
  );
}

export default App;
