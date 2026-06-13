const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/main.js',
  
  output: {
    path: path.resolve(__dirname, '../backend/public'),
    filename: "app.js",
    clean: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './plantilla/index.html',
      path: path.resolve(__dirname, '../backend/public'),
      filename: 'index.html',
      chunks: ['app']
    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
      ,{
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.mp3$/,
        type: 'asset/resource',
      },
      {
        test: /\.(mp3|wav|ogg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../backend/public'),
    },
    port: 8080, // Puerto del servidor
    open: true, // Abrir navegador automáticamente
    hot: true, // Habilitar Hot Module Replacement (HMR)
    historyApiFallback: true, // Aplicaciones SPA
  }
}