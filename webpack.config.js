const HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  cache: true,
  entry: {
    app: './src/index.ts',
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          },
          {
            loader: 'pug-html-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|ico)$/i,
        use: [
          'file-loader?name=assets/images/[name]-[hash:8].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2|mp3|mp4|xml|pdf)$/i,
        use: 'file-loader?name=assets/fonts/[name]-[hash:8].[ext]'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/**/*.*']),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      chunks: ['app'],
      favicon: './src/assets/images/favicon.ico'
    })
  ]
}
