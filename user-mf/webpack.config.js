const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // Uporabi bootstrap kot vstopno točko za remoteEntry
  entry: path.resolve(__dirname, "./src/bootstrap.js"),

  mode: "development",
  devServer: {
    port: 3003,
    static: { directory: path.join(__dirname, "public") },
    historyApiFallback: true,
    headers: {
      // Omogoči shellu (hostu) dostop prek CORS
      "Access-Control-Allow-Origin": "*"
    },
  },

  output: {
    publicPath: "auto",
  },

  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // JSX + modern JS
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
    // Najprej poišče .jsx potem .js
    extensions: [".jsx", ".js"],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "user_mf",
      filename: "remoteEntry.js",
      exposes: {
        // Shell bo lahko importal:
        //   import UserApp from "user_mf/UserApp";
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
