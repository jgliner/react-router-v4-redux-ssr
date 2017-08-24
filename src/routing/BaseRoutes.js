import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../views/Home.js';
import StaticPage from '../views/StaticPage.js';
import StaticPageWithDataDeps from '../views/StaticPageWithDataDeps.js';
import StaticDataDepsParams from '../views/StaticDataDepsParams.js';
import DynamicPage from '../views/DynamicPage.js';

function BaseRoutes({ location }) {
  return (
    <Switch>
      <Route exact path="/" component={Home} location={location} />
      <Route path="/static" component={StaticPage} location={location} />
      <Route path="/plusDataDeps" component={StaticPageWithDataDeps} location={location} />

      <Route path="/dataDepsParams(.*)?" component={StaticDataDepsParams} location={location} />
      <Route path="/dynamic/:id" component={DynamicPage} location={location} />
    </Switch>
  );
}

export default withRouter(connect()(BaseRoutes));
