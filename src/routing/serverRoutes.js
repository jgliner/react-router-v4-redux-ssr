/*
  serverRoutes.js

  Used instead of <Route> in `react-router-config` on the server.
  Compatible with `react-router-redux`'s `<ConnectedRouter>`
*/

import Base from '../containers/Base.js';

import Home from '../views/Home.js';
import StaticPage from '../views/StaticPage.js';
import StaticPageWithDataDeps from '../views/StaticPageWithDataDeps.js';
import StaticPageWithImage from '../views/StaticPageWithImage.js';
import StaticDataDepsParams from '../views/StaticDataDepsParams.js';
import DynamicPage from '../views/DynamicPage.js';

// Fairly straightforward object nesting, should mirror `<BaseRoute>`
// structure in /src/routing/BaseRoutes.js
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
        path: '/plusImage',
        component: StaticPageWithImage,
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
