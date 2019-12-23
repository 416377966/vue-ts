const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
  VueLoaderPlugin = require('vue-loader/lib/plugin.js'),
  path = require('path');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const isProduction = process.env.TYPE !== 'dev';

let baseConfig = {
  entry: resolve('src/main'),
  output: {
    hashDigestLength: 5
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      // 别名配置
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@scss': resolve('src/assets/scss'),
      '@img': resolve('src/assets/img')
	  }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {}
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'cache-loader',
            options: {}
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 9,
          name: 'img/[name].[hash:3].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 9,
          name: 'font/[name].[hash:3].[ext]'
        }
      },
      ...require('./utils.js').styleLoaders({ extract: isProduction }),
      {
        test: /\.(js|vue|ts|tsx|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
          cache: false,
          emitWarning: true,
          emitError: false
        }
      }
    ]
  },
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      vue: true,
      tslint: false,
      checkSyntacticErrors: true
    }),
    new FriendlyErrorsWebpackPlugin(),
    new VueLoaderPlugin()
  ]
};
module.exports = baseConfig;
