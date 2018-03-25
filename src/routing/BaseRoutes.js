/*
  BaseRoutes.js

  This component is unimportant when rendering on the server.
  However, once the client has the bundle, the server is no longer needed
  and we can use traditional `<Switch>` and `<Route>` components
*/

import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../views/Home.js';
import StaticPage from '../views/StaticPage.js';
import StaticPageWithDataDeps from '../views/StaticPageWithDataDeps.js';
import StaticPageWithImage from '../views/StaticPageWithImage.js';
import StaticDataDepsParams from '../views/StaticDataDepsParams.js';
import DynamicPage from '../views/DynamicPage.js';

function BaseRoutes({ location }) {
  // Since this is contained within `<Base>`, there is no need for
  // an "`<IndexRoute>`-like" component in previous versions of react-router
  return (
    <Switch>
      <Route exact path="/" component={Home} location={location} />
      <Route path="/static" component={StaticPage} location={location} />
      <Route path="/plusDataDeps" component={StaticPageWithDataDeps} location={location} />
      <Route path="/plusImage" component={StaticPageWithImage} location={location} />
        { /*
          For query params, need a wildcard after base route
          @TODO: Sanitization?
        */ }
      <Route path="/dataDepsParams(.*)?" component={StaticDataDepsParams} location={location} />
      <Route path="/dynamic/:id" component={DynamicPage} location={location} />
    </Switch>
  );
}

export default withRouter(connect()(BaseRoutes));
