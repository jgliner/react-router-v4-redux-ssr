/*
  renderer.js

  Responsible for server-side rendering and fetching
  appropriate assets for a given route

  Starts at `Function handleRender()`, called by the server
*/
import React from 'react';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import qs from 'qs';

import routes from '../src/routing/serverRoutes.js';
import configureStore from '../src/store.js';

const renderFullPage = (html, preloadedState, bundle, env) => {
  // the raw markup that the client will receive
  // notice how there is no static .html file anywhere in this repository!

  // also note how we are serializing the preloaded state to prevent XSS attacks
  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8">
        <title>RR+RRR v4 Server-Side</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css' />
        <link rel="icon" type="image/png" href="https://reacttraining.com/react-router/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="https://reacttraining.com/react-router/favicon-16x16.png" sizes="16x16">
        ${env === 'production' ? '<link rel="stylesheet" type="text/css" href="/dist/main.css">' : ''}
      </head>
      <body>
        <div id="root">
          <div>${html}</div>
        </div>
        <script>window.INITIAL_STATE = ${serialize(preloadedState)};</script>
        ${bundle}
      </body>
    </html>
  `);
};

const normalizeAssets = (assets) => {
  return assets.reduce((acc, chunk) => {
    if (Array.isArray(chunk)) {
      chunk.forEach((chunklet) => {
        // need to drill down one level, since
        // HMR injects itself into the `main` chunk
        acc.push(chunklet);
      });
    }
    else {
      acc.push(chunk);
    }
    return acc;
  }, []);
};

const concatDevBundle = (assetsByChunkName) => {
  return normalizeAssets([
    assetsByChunkName.main,
  ])
    .filter(path => path.endsWith('.js'))
    .map(path => `<script src="/${path}"></script>`)
    .join('\n');
};

const loadRouteDependencies = (location, store) => {
  // matchRoutes from 'react-router-config' handles this nicely
  const currentRoute = matchRoutes(routes, location);

  const need = currentRoute.map(({ route, match }) => {
    // once the route is matched, iterate through each component
    // looking for a `static loadData()` method
    // (you'll find these in the data-dependent `/src/views/` components)
    if (route.component) {
      return route.component.loadData ?
        // the following will be passed into each component's `loadData` method:
        route.component.loadData(
          store,
          match,
          location,
            // query params are stored in the same place as dynamic child routes,
            // but the key will be '0'
          qs.parse(match.params['0'], { ignoreQueryPrefix: true })
        ) :
        Promise.resolve(null);
    }
    // @TODO: return 404
    Promise.resolve(null);
  });

  return Promise.all(need);
};

const handleRender = (req, res) => {
  // start here

  // --> /src/store.js
  const { store, history } = configureStore({}, 'fromServer');

  // once `store` is configured, dispatch the proper route into
  // the routerReducer
  store.dispatch(push(req.originalUrl)); // Need to find more elegant way to do this?

  // now that the route is in the redux state tree,
  // routing itself is taken care of...
  // however, in order to render the page, we need to check
  // if there are any data dependencies, and if so, load them
  loadRouteDependencies(req.originalUrl, store)
    .then((data) => {
      let bundle;
      if (process.env.NODE_ENV === 'development') {
        // in dev, it's necessary to dynamically load each asset
        // so that HMR works properly
        bundle = concatDevBundle(res.locals.webpackStats.toJson().assetsByChunkName);
      }
      else {
        // in prod, the bundle is pre-compiled, so it's ok to serve it statically
        bundle = '<script src="/dist/main.js"></script>';
      }

      // this is where server-side rendering actually happens!
      // however, we have a problem:
      // static routing is the only way the server can route,
      // and we need to use <ConnectedRouter> (from rrr) instead of `<StaticRouter>` (from rr v4)...
      // this is where `react-router-config` comes to the rescue (--> /routing/serverRoutes for more detail)
      const toRender = ReactDOMServer.renderToString((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              {renderRoutes(routes, { ...data })}
            </div>
          </ConnectedRouter>
        </Provider>
      ));
      // once everything is fully rendered, get a copy of the current redux state
      // to send to the client so it can pick up where the server left off
      const preloadedState = store.getState();

      // --> /index.js
      res.status(200).send(renderFullPage(toRender, preloadedState, bundle, process.env.NODE_ENV));
    })
    .catch((err) => {
      console.error(err);
    });
};

export { handleRender }; // eslint-disable-line
