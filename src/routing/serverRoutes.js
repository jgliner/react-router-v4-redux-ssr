import Base from '../containers/Base.js';

import Home from '../views/Home.js';
import StaticPage from '../views/StaticPage.js';
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
        path: '/dynamic',
        component: DynamicPage,
      },
    ],
  },
];

export default routes;
