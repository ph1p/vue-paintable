const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const webpackConfig = (module.exports = {});
const isProduction = process.env.NODE_ENV === 'production';

webpackConfig.entry = isProduction ? './src' : './src/dev/app.js';

webpackConfig.output = {
  path: path.join(__dirname, './dist'),
  // publicPath: '/',
  filename: 'index.js',
  libraryTarget: 'umd'
};

webpackConfig.resolve = {
  extensions: ['.vue', '.js']
};

webpackConfig.plugins = [new UglifyJsPlugin()];

if (!isProduction) {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/dev/index.html'
    })
  );
  webpackConfig.resolve.alias = {
    vue$: 'vue/dist/vue.esm.js'
  };
}

webpackConfig.module = {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }
  ]
};

if (!isProduction) {
  webpackConfig.devServer = {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true
  };
}
