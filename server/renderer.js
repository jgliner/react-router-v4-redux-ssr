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

  const currentRoute = matchRoutes(routes, location);

  const need = currentRoute.map(({ route, match }) => {
    if (route.component) {
      return route.component.loadData ?

        route.component.loadData(
          store,
          match,
          location,
          qs.parse(match.params['0'], { ignoreQueryPrefix: true })
        ) :
        Promise.resolve(null);
    }

    Promise.resolve(null);
  });

  return Promise.all(need);
};

const handleRender = (req, res) => {
  const { store, history } = configureStore({}, 'fromServer');
  store.dispatch(push(req.originalUrl)); // Need to find more elegant way to do this?
  loadRouteDependencies(req.originalUrl, store)
    .then((data) => {
      let bundle;
      if (process.env.NODE_ENV === 'development') {
        bundle = concatDevBundle(res.locals.webpackStats.toJson().assetsByChunkName);
      }
      else {

        bundle = '<script src="/dist/main.js"></script>';
      }
      const toRender = ReactDOMServer.renderToString((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              {renderRoutes(routes, { ...data })}
            </div>
          </ConnectedRouter>
        </Provider>
      ));
      const preloadedState = store.getState();

      res.status(200).send(renderFullPage(toRender, preloadedState, bundle, process.env.NODE_ENV));
    })
    .catch((err) => {
      console.error(err);
    });
};

export { handleRender }; // eslint-disable-line
