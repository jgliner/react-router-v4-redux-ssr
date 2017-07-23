import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../views/Home.js';

function BaseRoutes({ location }) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

export default withRouter(connect()(BaseRoutes));
