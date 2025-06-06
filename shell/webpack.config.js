// shell/webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // Entrypoint for your shell React app
  entry: path.resolve(__dirname, "./src/index.js"),

  mode: "development",

  output: {
    // Let Module Federation figure out where to load chunks/remotes from at runtime
    publicPath: "auto"
  },

  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, "public")
    },
    historyApiFallback: true,
    headers: {
      // Still allow fetching remotes from other ports
      "Access-Control-Allow-Origin": "*"
    },
    hot: true,

    // ← Proxy block to forward all `/api` calls to your backend
    proxy: {
      "/api": {
        target: "http://host.docker.internal:5000",
        secure: false,
        changeOrigin: true
      }
    }
  },

  module: {
    rules: [
      {
        // Transpile both .js and .jsx via Babel
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",    // modern JS
              "@babel/preset-react"   // JSX support
            ]
          }
        }
      },
      {
        // CSS support
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  resolve: {
    // so you can import "Foo" instead of "Foo.jsx"
    extensions: [".jsx", ".js"]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js", // only needed if shell itself is consumed as a remote
      remotes: {
        user_mf:        "user_mf@http://localhost:3003/remoteEntry.js",
        restaurant_mf: "restaurant_mf@http://localhost:3004/remoteEntry.js",
        order_mf:       "order_mf@http://localhost:3005/remoteEntry.js"
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
