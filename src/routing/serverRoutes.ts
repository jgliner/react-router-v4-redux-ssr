/*
  serverRoutes.ts

  Used instead of <Route> in `react-router-config` on the server.
  Compatible with `react-router-redux`'s `<ConnectedRouter>`
*/

import Base from '../containers/Base';

import Home from '../views/Home';
import StaticPage from '../views/StaticPage';
import StaticPageWithDataDeps from '../views/StaticPageWithDataDeps';
import StaticDataDepsParams from '../views/StaticDataDepsParams';
import DynamicPage from '../views/DynamicPage';

// Fairly straightforward object nesting, should mirror `<BaseRoute>`
// structure in /src/routing/BaseRoutes.ts
const routes = [
  {
    component: Base,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/static',
        component: StaticPage,
      },
      {
        path: '/plusDataDeps',
        component: StaticPageWithDataDeps,
      },
      {
        // For query params, need a wildcard after base route
        // @TODO: Sanitization?
        path: '/dataDepsParams(.*)?',
        component: StaticDataDepsParams,
      },
      {
        path: '/dynamic/:id',
        component: DynamicPage,
      },
    ],
  },
];

export default routes;
