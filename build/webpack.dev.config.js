process.binding(
  'http_parser'
).HTTPParser = require('http-parser-js').HTTPParser;
const baseConfig = require('./webpack.base.config.js'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  WebpackDevServer = require('webpack-dev-server'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  opn = require('opn'),
  chalk = require('chalk'),
  path = require('path');
const openPage = '/index.html';
let isFirst = true,
  customParams = JSON.parse(process.env.npm_config_argv).original,
  newPort = '80',
  portParamsIndex = customParams.indexOf('-p'),
  isAutoOpen = false;
if (portParamsIndex > -1) {
  let tempPort = customParams[portParamsIndex + 1];
  if (tempPort > 0) {
    newPort = customParams[portParamsIndex + 1];
  } else {
    console.log(chalk.red('端口号设置错误, 正确方式: -p 8080'));
    return;
  }
}
if (customParams.indexOf('-o') > -1) {
  isAutoOpen = true;
}
const attr = str => chalk.rgb(152, 195, 121)(str),
  attrValue = str => chalk.rgb(97, 175, 239)(str);
let devConfig = {
  output: {
    filename: 'js/[name].js',
    publicPath: './'
  },
  mode: 'development',
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        TYPE: JSON.stringify(process.env.TYPE), // 环境type
        VERSION: JSON.stringify(require('../package.json').version)
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
      renderThrottle: 1,
      format: `<${chalk.magenta(process.env.TYPE)}  ${attr('progress=')}${attrValue(':percent')}  ${attr('time=')}${attrValue(':elapseds')}  ${attr('status=')}${attrValue(':msg')} />`,
      callback: async function() {
        if (isFirst === false) return;
        isFirst = false;
        let url = 'http://localhost:' + newPort + openPage;
        if (isAutoOpen) {
          await opn(url);
        }
        setTimeout(() => {
          console.log(
            `\nStarting server on ${url}  ||  http://${require('ip').address()}:${newPort +
              openPage}`
          );
        }, 1000);
      }
    })
  ]
};
let webpackConfig = merge({}, baseConfig, devConfig);
const opts = {
  contentBase: [path.join(__dirname, '../')],
  hot: true,
  host: '0.0.0.0',
  compress: true,
  noInfo: false,
  quiet: false,
  disableHostCheck: true,
  publicPath: '/',
  overlay: {
    warnings: true,
    errors: true
  },
  stats: 'errors-only'
};
WebpackDevServer.addDevServerEntrypoints(webpackConfig, opts);
const compiler = webpack(webpackConfig);

new WebpackDevServer(compiler, opts).listen(newPort, '0.0.0.0');
