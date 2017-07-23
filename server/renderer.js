// Server rendering entry

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

import routes from '../src/routing/serverRoutes.js';
import configureStore from '../src/store.js';

import Base from '../src/containers/Base.js';

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

const renderFullPage = (html, preloadedState, assetsByChunkName) => {
  return (`
    <!DOCTYPE html>
    <html lang="en" class="wf-loading">
      <head>
        <meta charSet="utf-8">
        <meta httpEquiv="X-UA-Compatible" content="IE=edge">
        <title>RR+RRR v4 Server-Side</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css' />
        <link rel="icon" type="image/png" href="https://reacttraining.com/react-router/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="https://reacttraining.com/react-router/favicon-16x16.png" sizes="16x16">
      </head>
      <body>
        <div id="root">
          <div>${html}</div>
        </div>
        <script data-cfasync="false">window.INITIAL_STATE = ${serialize(preloadedState)};</script>
        ${
          normalizeAssets([
            assetsByChunkName.main,
          ])
          .filter((path) => {
            return path.endsWith('.js');
          })
          .map(path => `<script src="${path}"></script>`)
          .join('\n')
        }
      </body>
    </html>
  `);
};

const loadRouteDependencies = (location) => {
  const currentRoute = matchRoutes(routes, location.pathname);

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

const handleRender = (req, res) => {
  loadRouteDependencies(req.url)
    .then((data) => {
      const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

      const { store, history } = configureStore({}, 'fromServer');
      const toRender = ReactDOMServer.renderToString((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Base />
          </ConnectedRouter>
        </Provider>
      ));
      
      const preloadedState = store.getState();
      res.status(200).send(renderFullPage(toRender, preloadedState, assetsByChunkName));
    })
    .catch((err) => {
      console.error(err);
    });
};

export { handleRender }; // eslint-disable-line
