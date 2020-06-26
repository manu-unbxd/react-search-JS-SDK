const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src')
};

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    //app: Path.resolve(__dirname, '../demo/index.js'),
    "core": Path.resolve(__dirname, '../public/css/core/index.scss'),
    "theme": Path.resolve(__dirname, '../public/css/theme/index.scss'),
    "unbxd-react-search-sdk": Path.resolve(__dirname, '../src/UnbxdSearchWrapper.js'),
  },
  mode: 'production',
  output: {
    path: Path.join(__dirname, '../public/dist'),
    filename: 'js/[name].js',
    sourceMapFilename: '[file].map'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "common",
          chunks: "all"
        },
        coreStyles: {
          name: 'core',
          test: (m, c, entry = 'core') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        themeStyles: {
          name: 'theme',
          test: (m, c, entry = 'theme') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        }
      }
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    usedExports: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: Path.resolve(__dirname, '../public'),
      filename: 'css/[name].css',
      chunkFilename: '[id].css'

    }),
    new RemovePlugin({
      after: {
        root: './public/dist/js',
        include: [
          'core.js',
          'theme.js'
        ],
      }
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-private-methods', '@babel/plugin-proposal-class-properties']
          }
        }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
          require.resolve('sass-loader')
        ]
      }

    ]
  }
};
