require('babel-register')({
  presets: ['env', 'es2015', 'react', 'stage-0'],
});
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
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');
  const compiler = webpack(config);

  app.use(hotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
  app.use(webpackMiddleware(compiler, {
    publicPath: '/',
    serverSideRender: true,
  }));
}
else {
  app.use('/dist', express.static('./dist'));
}
app.use('*', rendering.handleRender);

app.listen(PORT, () => {
  console.log(` ⚙️  ${process.env.NODE_ENV.toUpperCase()} app listening @ ${PORT} ⚙️ \n`);
  console.log(` --  launched @ ${Date()}  --`);
  console.log('-------------------------------------------------------------------------------------\n\n');
});
