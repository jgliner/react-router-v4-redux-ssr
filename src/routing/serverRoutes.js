import Base from '../containers/Base.js';
import Home from '../views/Home.js';

const routes = [
  {
    component: Base,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      // {
      //   path: '/child/:id',
      //   component: Child,
      // },
    ],
  },
];

export default routes;
