require('babel-register');
require.extensions['.css'] = _ => _;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rendering = require('./renderer.js');
const http = require('http');

const PORT = process.env.PORT || 3005;

const app = express();
let server;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  const chokidar = require('chokidar');
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
  const watcher = chokidar.watch('./');

  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach((id) => {
        if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
      });
    });
  });
  compiler.plugin('done', () => {
    console.log('Clearing /src/ module cache from server');
    Object.keys(require.cache).forEach((id) => {
      if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id];
    });
  });
}
else {
  app.use('/dist', express.static('./dist'));
}
app.use('*', rendering.handleRender);

server = http.createServer(app);
server.listen(PORT, () => {
  console.log(` ⚙️  ${process.env.NODE_ENV.toUpperCase()} app listening @ ${PORT} ⚙️ \n`);
  console.log(` --  launched @ ${Date()}  --`);
  console.log('-------------------------------------------------------------------------------------\n\n');
});
