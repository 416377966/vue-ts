let baseConfig = require('./webpack.base.config.js');
const webpack = require('webpack'),
  merge = require('webpack-merge'),
  Terser = require('terser-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  chalk = require('chalk'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  path = require('path');

const attr = str => chalk.rgb(152, 195, 121)(str),
  attrValue = str => chalk.rgb(97, 175, 239)(str);
let buildConfig = {
  mode: 'production',
  output: {
    chunkFilename: `js/[name].[chunkhash:4].js`,
    filename: `js/[name].[chunkhash:4].js`,
    path: path.resolve(__dirname, '../bin/'),
    publicPath: './'
  },
  externals: {},
  performance: {
    maxEntrypointSize: 712 * 1014,
    maxAssetSize: 712 * 1014
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new ProgressBarPlugin({
      renderThrottle: 1,
      format: `<${chalk.magenta(process.env.TYPE)}  ${attr('progress=')}${attrValue(':percent')}  ${attr('time=')}${attrValue(':elapseds')}  ${attr('status=')}${attrValue(':msg')} />`
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: `css/[chunkhash:4].css`,
      chunkFilename: `css/[name].[chunkhash:4].css`,
      publicPath: '../'
    })
  ],
  devtool: 'source-map',
  target: 'web',
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new Terser({
        test: /\.m?js(\?.*)?$/i,
        chunkFilter: () => true,
        warningsFilter: () => true,
        extractComments: false,
        sourceMap: true,
        cache: true,
        cacheKeys: defaultCacheKeys => defaultCacheKeys,
        parallel: true,
        terserOptions: {
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/i
          },
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  }
};

let webpackConfig = merge({}, baseConfig, buildConfig);
webpack(webpackConfig, (err, stats) => {
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  );

  if (stats.hasErrors()) {
    console.error('  Build failed with errors.\n');
    process.exit(1);
  }
});
