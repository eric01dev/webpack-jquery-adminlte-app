const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInjector = require("html-webpack-injector");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Plugins
const plugins = [
  new CleanWebpackPlugin(),
  new webpack.ids.HashedModuleIdsPlugin(),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
  }),
  new HtmlWebpackInjector(),
  new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "css/[id].css",
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: "./src/public",
        to: "public",
      },
    ],
  }),
];

// HtmlWebpackPlugin
const pagesHtmlFiles = glob.sync("./src/html/**/*.html");
const indexHtml = glob.sync("./src/index.html");
var initHtmlWebpackPlugin = function (files) {
  files.forEach((file) => {
    plugins.push(
      new HtmlWebpackPlugin({
        filename: path.dirname(file).replace('src', '') + '/' + path.basename(file),
        template: file,
        minify: true,
        chunks: [path.basename(file, path.extname(file)), "common"],
        favicon: path.resolve(__dirname, "src/public/images/favicon.ico"),
      })
    );
  });
}
initHtmlWebpackPlugin(pagesHtmlFiles);
initHtmlWebpackPlugin(indexHtml);

// Entry
const entries = {};
const pagesEntryFiles = glob.sync("./src/js/pages/**/*.js");
const commonEntryFiles = glob.sync("./src/js/*.js");
var initEntries = function (files) {
  files.forEach((file) => {
    entries[path.basename(file, path.extname(file))] = [
      path.dirname(file) + '/' + path.basename(file, path.extname(file)) + ".js",
      path.dirname(file).replace('js', 'scss') + '/' + path.basename(file, path.extname(file)) + ".scss",
    ];
  });
}
initEntries(pagesEntryFiles);
initEntries(commonEntryFiles);

// Config
const config = {
  mode: process.env.NODE_ENV,

  entry: entries,

  devtool: process.env.NODE_ENV !== "production" ? "source-map" : false,

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].js",
  },

  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
  },

  target: ["web", "es5"],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: path.resolve(__dirname, "babel.config.js"),
            compact: false,
            cacheDirectory: true,
            sourceMaps: false,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name].[ext]",
              fallback: "file-loader",
              outputPath: "public/images",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        type: "asset/inline",
      },
    ],
  },

  plugins: plugins,

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = config;
