const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: path.resolve(__dirname, "./src/bootstrap.js"),
  mode: "development",
  output: {
    publicPath: "auto",
    uniqueName: "order_mf"
  },
  devServer: {
    port: 3005,
    static: { directory: path.join(__dirname, "public") },
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: false,
    liveReload: true,
    // ---------- Tu dodamo proxy blok ----------
    proxy: {
      // Vsi klici, ki začnejo z /api, bodo preusmerjeni na order-service
      "/api": {
        target: "http://localhost:8080", // order-service posluša na 8080
        changeOrigin: true,
        secure: false,
        // Če želiš, lahko dodaš timeout-e:
        // timeout: 60000,
        // proxyTimeout: 60000
      }
    }
    // -----------------------------------------
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "order_mf",
      filename: "remoteEntry.js",
      exposes: {
        "./OrderApp": "./src/App.jsx"
      },
      shared: {
        react:      { singleton: true, eager: true, requiredVersion: "^18.0.0" },
        "react-dom":{ singleton: true, eager: true, requiredVersion: "^18.0.0" }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html")
    })
  ]
};
