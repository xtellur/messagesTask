const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const root = path.resolve(__dirname, '..')
const srcDir = path.resolve(root, 'src')
const modulesDir = path.resolve(root, 'node_modules')

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
  },
}

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  },
}

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: () => [
      require('postcss-import')(),
      require('postcss-nested')(),
      require('postcss-custom-properties')(),
      require('postcss-custom-media')(),
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
    ],
  },
}

module.exports = {
  entry: ['babel-polyfill', path.resolve(srcDir, 'App.tsx')],
  output: {
    path: path.resolve(root, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: [modulesDir],
    extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
    alias: {
      '@': srcDir,
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: modulesDir,
        query: {
          minimize: true,
        },
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: modulesDir,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['@babel/plugin-syntax-dynamic-import', 'react-hot-loader/babel'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esnext',
              },
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: modulesDir,
        use: ['style-loader', CSSLoader],
      },
      {
        test: /\.css$/,
        exclude: modulesDir,
        use: ['style-loader', CSSModuleLoader, PostCSSLoader],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'MessagesTask',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
      mobile: true,
      lang: 'en',
    }),
  ],
}
