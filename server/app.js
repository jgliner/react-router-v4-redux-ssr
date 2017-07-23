require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
});
require.extensions['.css'] = _ => _;

const webpack = require('webpack');

const webpackMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rendering = require('./renderer.js');

const PORT = process.env.PORT || 3005;

const app = express();

const config = require('../webpack.config.js');

const compiler = webpack(config);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));
app.use(webpackMiddleware(compiler, {
  publicPath: '/',
  serverSideRender: true,
}));
app.use('*', rendering.handleRender);

app.listen(PORT, () => {
  console.log(` ⚙️  ${process.env.NODE_ENV.toUpperCase()} app listening @ ${PORT} ⚙️ \n`);
  console.log(` --  launched @ ${Date()}  --`);
  console.log('using', process.env.ENV_CONF, '\n');
  console.log('-------------------------------------------------------------------------------------\n\n');
});
