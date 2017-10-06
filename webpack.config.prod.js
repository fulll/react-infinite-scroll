const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: resolve(__dirname, './src'),
  },
  output: {
    filename: 'react-infinite-scroll.min.js',
    path: resolve(__dirname, './dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'reactInfiniteScroll',
  },
  devtool: 'source-map',
  target: 'node',
  externals: {
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, './src')],
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
}
