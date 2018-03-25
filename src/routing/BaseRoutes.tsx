/*
  BaseRoutes.tsx

  This component is unimportant when rendering on the server.
  However, once the client has the bundle, the server is no longer needed
  and we can use traditional `<Switch>` and `<Route>` components
*/

import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';

import Home from '../views/Home';
import StaticPage from '../views/StaticPage';
import StaticPageWithDataDeps from '../views/StaticPageWithDataDeps';
import StaticDataDepsParams from '../views/StaticDataDepsParams';
import DynamicPage from '../views/DynamicPage';

interface IProps extends DispatchProp<any>, RouteComponentProps<any> {
  // location: history.Location;
}

class BaseRoutes extends React.Component<IProps> {
  // No data to fetch, no static method needed
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { location } = this.props;

    // Since this is contained within `<Base>`, there is no need for
    // an "`<IndexRoute>`-like" component in previous versions of react-router
    return (
      <Switch>
        <Route exact={true} path="/" component={Home} location={location} />
        <Route path="/static" component={StaticPage} location={location} />
        <Route path="/plusDataDeps" component={StaticPageWithDataDeps} location={location} />
          { /*
            For query params, need a wildcard after base route
            @TODO: Sanitization?
          */ }
        <Route path="/dataDepsParams(.*)?" component={StaticDataDepsParams} location={location} />
        <Route path="/dynamic/:id" component={DynamicPage} location={location} />
      </Switch>
    );
  }
}

export default withRouter(connect()(BaseRoutes));
