const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const webpackConfig = (module.exports = {});
const isProduction = process.env.NODE_ENV === 'production';

webpackConfig.mode = isProduction ? 'production' : 'development';
webpackConfig.entry = isProduction ? ['@babel/polyfill', './src'] : ['@babel/polyfill', './src/dev/app.js'];

webpackConfig.output = {
  path: path.join(__dirname, './dist'),
  // publicPath: '/',
  filename: 'index.js'
};

webpackConfig.resolve = {
  extensions: ['.vue', '.js']
};

webpackConfig.plugins = [new UglifyJsPlugin(), new VueLoaderPlugin()];

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
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            indentedSyntax: false
          }
        }
      ]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
      // options: {
      //   loaders: {
      //     scss: 'vue-style-loader!css-loader!sass-loader'
      //   }
      // }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
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
