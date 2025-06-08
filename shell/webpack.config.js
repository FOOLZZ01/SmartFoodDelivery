const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: "development",
  output: {
    publicPath: "auto",
  },
  devServer: {
    port: 3001,
    static: { directory: path.join(__dirname, "public") },
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    proxy: {
      // Authentication service (auth endpoints)
      "/api/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        logLevel: "debug",
      },
      // Če obstaja ločen user-service
      "/api/users": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api/orders": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/api/restaurants": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
      // … ostali proxy-ji po potrebi …
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
      name: "shell",
      remotes: {
        user_mf:       "user_mf@http://localhost:3003/remoteEntry.js",
        restaurant_mf:"restaurant_mf@http://localhost:3004/remoteEntry.js",
        order_mf:      "order_mf@http://localhost:3005/remoteEntry.js",
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
