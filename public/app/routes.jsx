import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import Home from '../home/home';
import About from '../about/about';

const Routes = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
