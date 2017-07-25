// Server rendering entry

import React from 'react';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

import routes from '../src/routing/serverRoutes.js';
import configureStore from '../src/store.js';

const normalizeAssets = (assets) => {
  return assets.reduce((acc, chunk) => {
    if (Array.isArray(chunk)) {
      chunk.forEach((chunklet) => {
        acc.push(chunklet);
      });
    }
    else {
      acc.push(chunk);
    }
    return acc;
  }, []);
};

const renderFullPage = (html, preloadedState, bundle, env) => {
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
        <script data-cfasync="false">window.INITIAL_STATE = ${serialize(preloadedState)};</script>
        ${bundle}
      </body>
    </html>
  `);
};

const loadRouteDependencies = (location) => {
  const currentRoute = matchRoutes(routes, location);
  console.log(location, '----------->')
  console.log(currentRoute)

  const need = currentRoute.map(({ route, match }) => {
    if (route.component) {
      return route.component.loadData ?
        route.component.loadData(match) :
        Promise.resolve(null);
    }
    // @TODO: return 404
    Promise.resolve(null);
  });

  return Promise.all(need);
};

const concatDevBundle = (assetsByChunkName) => {
  return normalizeAssets([
    assetsByChunkName.main,
  ])
    .filter(path => path.endsWith('.js'))
    .map(path => `<script src="${path}"></script>`)
    .join('\n');
};

const handleRender = (req, res) => {
  loadRouteDependencies(req.originalUrl)
    .then((data) => {
      let bundle;
      if (process.env.NODE_ENV === 'development') {
        bundle = concatDevBundle(res.locals.webpackStats.toJson().assetsByChunkName);
      }
      else {
        bundle = '<script src="/dist/main.js"></script>';
      }

      const { store, history } = configureStore({}, 'fromServer');
      const toRender = ReactDOMServer.renderToString((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              {renderRoutes(routes)}
            </div>
          </ConnectedRouter>
        </Provider>
      ));

      store.dispatch(push(req.originalUrl));
      const preloadedState = store.getState();

      res.status(200).send(renderFullPage(toRender, preloadedState, bundle, process.env.NODE_ENV));
    })
    .catch((err) => {
      console.error(err);
    });
};

export { handleRender }; // eslint-disable-line
