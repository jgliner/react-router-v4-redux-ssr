import Base from '../containers/Base.js';

import Home from '../views/Home.js';
import StaticPage from '../views/StaticPage.js';

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
    ],
  },
];

export default routes;
