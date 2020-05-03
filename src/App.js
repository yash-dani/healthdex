import React, { Component } from 'react';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}
