import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../home/home';
import Send from '../send/send';
// import Success from '../send/success';
import TranHistory from '../history/history';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/send" component={Send} />
      {/*<Route path="/success" component={Success} />*/}
      <Route path="/history" component={TranHistory} />
    </Switch>
  </Router>
);

export default Routes;
