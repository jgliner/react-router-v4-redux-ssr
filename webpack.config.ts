const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

console.log('\ncurrent pathname is:\n', path.resolve(__dirname, 'dist'), '\n');

const main = ['./src/index.tsx'];
let plugins = [];
let cssLoaders = [];
// let handleJS = {};

if (process.argv.includes('NODE_ENV=production')) {
  // Production bundle includes ExtractText to prevent FOUC
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
  // Dev bundle includes HMR
  console.log('Preparing dev server...\n\n');
  main.push('./server/renderer.tsx');
  main.unshift('webpack-hot-middleware/client');

  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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

// Standard webpack config... nothing too fancy
module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    main,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
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
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css', 'scss'],
    modules: ['node_modules'],
  }
};
