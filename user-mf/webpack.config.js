const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: path.resolve(__dirname, "./src/bootstrap.js"),
  mode: "development",
  output: {
    publicPath: "auto",
  },
  devServer: {
    port: 3003,
    static: { directory: path.join(__dirname, "public") },
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      // nastavljen na port 5001, kjer tvoj auth-service teče
      "/api/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        logLevel: "debug",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "user_mf",
      filename: "remoteEntry.js",
      exposes: {
        "./UserApp": "./src/App.jsx",
      },
      shared: {
        react:      { singleton: true, eager: true, requiredVersion: "^18.0.0" },
        "react-dom":{ singleton: true, eager: true, requiredVersion: "^18.0.0" },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
