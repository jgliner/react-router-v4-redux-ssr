const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

console.log('\ncurrent pathname is:\n', path.resolve(__dirname, 'dist'), '\n');

const main = ['./index.js'];
let plugins = [];
let cssLoaders = [];

if (process.argv.includes('NODE_ENV=production')) {
  console.log('Bundling for production...\n\n');
  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: true,
        NODE_ENV: JSON.stringify('production'),
        PORT: 3005,
      },
      '__DEV__': false,
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
    }),
  ];

  cssLoaders = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader',
  });
}
else {
  console.log('Preparing dev server...\n\n');
  main.unshift('webpack-hot-middleware/client?path=http://localhost:3005/__webpack_hmr');

  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: true,
        NODE_ENV: JSON.stringify('development'),
        PORT: 3005,
      },
      '__DEV__': true,
    }),
  ];

  cssLoaders = [
    'style-loader',
    'css-loader',
  ];
}

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    main,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'stage-0', 'react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};
