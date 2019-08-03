const path = require("path"),
  HTMLPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
  autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({}), new UglifyJsPlugin()]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 4224
  },
  plugins: [
    new HTMLPlugin({
      filename: "index.html",
      template: "./src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|ttc|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
