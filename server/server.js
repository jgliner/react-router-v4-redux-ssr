/*
  app.js

  Express server
*/

require('babel-register');
// Prevents CSS from being bundled with webpack in prod
require.extensions['.css'] = _ => _;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rendering = require('./renderer.js');

const PORT = process.env.PORT || 3005;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  // Only necessary in dev...
  // In prod, we don't need all this webpack stuff,
  // since we're pre-compiling our bundle
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');
  const compiler = webpack(config);

  app.use(hotMiddleware(compiler, {
    log: console.log,
    heartbeat: 10 * 1000,
  }));
  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: true,
  }));
}
else {
  // Only necessary in prod...
  // This uses /dist as a dir for static files, since
  // we want prod to serve the concatted/minified bundle instead of
  // each component importing its own CSS...
  // If you do not set this up correctly, you'll get FOUC in prod. Not good.
  app.use('/dist', express.static('./dist'));
}
// --> /server/renderer.js
app.use('*', rendering.handleRender);

app.listen(PORT, () => {
  console.log(` ⚙️  ${process.env.NODE_ENV.toUpperCase()} app listening @ ${PORT} ⚙️ \n`);
  console.log(` --  launched @ ${Date()}  --`);
  console.log('-------------------------------------------------------------------------------------\n\n');
});
