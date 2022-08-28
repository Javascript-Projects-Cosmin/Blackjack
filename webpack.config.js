'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const isProduction = process.env.NODE_ENV === 'production';

const port = process.env.PORT || 3000;

let config = {
  // Webpack configuration goes here
  mode: 'production', // mode tells Webpack this configuration will be for either development or production. 
  // “Development Mode [is] optimized for speed and developer experience… Production defaults will give you a set of defaults useful 
  // for deploying your application (webpack 4: mode and optimization)”.
  entry: ['./src/index.tsx', './src/compiledCss/index.css'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.[hash].js'
  },
  /*
  To get a running instance of Webpack we need:

    entry — Specifies the entry point of your application; this is where your React app lives and where the bundling process will begin (Docs)
    Webpack 4 introduced some defaults, so if you don’t include entry in your configuration, then Webpack will assume your entry point is located under the ./src directory, making entry optional as opposed to Webpack 3. For this tutorial I have decided to leave entry as it makes it obvious where our entry point will be, but you are more than welcome to remove it if you so decide.

    output — Tells Webpack how to write the compiled files to disk (Docs)
    filename — This will be the filename of the bundled application. The [hash] portion of the filename will be replaced by a hash generated by Webpack every time your application changes and is recompiled (helps with caching).
  */
  devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',// devtool will create source maps to help you with debugging of your application. There are several types of source maps and this particular map (inline-source-map) is to be used only in development. (Refer to the docs for more options).
  // do not continue on error
  bail: true,
  module: {
    rules: [

      // First Rule
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },

      // Second Rule
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 0,
              sourceMap: isProduction ? false : true,
            }
          },
          
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
            limit: 1000,
            name: 'images/[name].[ext]'
      }
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
            limit: 1000,
            name: 'fonts/[name].[ext]'
      }
    },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  /*
  module — What types of modules your application will include, in our case we will support ESNext (Babel) and CSS Modules
  rules — How we handle each different type of module
  We test for files with a .js extension excluding the node_modules directory and use Babel, via babel-loader, to transpile down to vanilla JavaScript (basically, looking for our React files).Remember our configuration in .babelrc? This is where Babel looks at that file.
  We test for CSS files with a .css extension. Here we use two loaders, style-loader and css-loader, to handle our CSS files. Then we instruct css-loader to use CSS Modules, camel case and create source maps.
  This gives us the ability to use import Styles from ‘./styles.css’ syntax (or destructuring like this import { style1, style2 } from ‘./styles.css’).
  */
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
      manifest: "./public/manifest.json",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  },
};


module.exports = config;