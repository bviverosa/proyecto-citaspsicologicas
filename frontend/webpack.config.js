const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    app: "./src/Aplicacion.jsx",
  },
  output: {
    path: path.resolve(__dirname, '../backend/public'),
    filename: "[name].js",
    clean: true
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