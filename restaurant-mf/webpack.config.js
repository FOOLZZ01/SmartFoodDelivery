const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: "development",
  devServer: {
    port: 3004,
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"   // omogoči hostu dostop
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
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"       // JSX podpora
            ],
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
    extensions: [".js", ".jsx"],            // najprej .js pa .jsx
    alias: {
      // vsaka import pot, ki se začne z "./components", bo preslikana v src/
      "./components": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "restaurant_mf",
      filename: "remoteEntry.js",
      exposes: {
        "./RestaurantApp": "./src/App",      // dovoli hostu import "./RestaurantApp"
      },
      shared: {
        react:      { singleton: true, eager: true, requiredVersion: "^18.0.0" },
        "react-dom":{ singleton: true, eager: true, requiredVersion: "^18.0.0" },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
