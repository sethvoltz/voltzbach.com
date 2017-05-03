var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  devServer: {
    historyApiFallback: true
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // Typescript is handled by 'awesome-typescript-loader'
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },

      // Javascript gets sourcemaps re-processed by 'source-map-loader'
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },

      // Stylesheets full process pipeline
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
    ]
  },

  // Allow browser to keep cache of seldom-changing libs
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  plugins: [new HtmlWebpackPlugin({
    template: __dirname + '/assets/index.html',
    filename: 'index.html',
    injext: 'body'
  })],
};
