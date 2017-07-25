import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../views/Home.js';
import StaticPage from '../views/StaticPage.js';
import StaticPageWithDataDeps from '../views/StaticPageWithDataDeps.js';

function BaseRoutes({ location }) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/static" component={StaticPage} />
      <Route path="/plusDataDeps" component={StaticPageWithDataDeps} />
    </Switch>
  );
}

export default withRouter(connect()(BaseRoutes));
