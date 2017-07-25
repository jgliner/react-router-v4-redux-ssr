import Base from '../containers/Base.js';

import Home from '../views/Home.js';
import StaticPage from '../views/StaticPage.js';
import StaticPageWithDataDeps from '../views/StaticPageWithDataDeps.js';
import DynamicPage from '../views/DynamicPage.js';

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
        path: '/dynamic/:id',
        component: DynamicPage,
      },
    ],
  },
];

export default routes;
