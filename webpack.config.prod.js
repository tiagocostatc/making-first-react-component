/* global __dirname, require, module*/

const webpack = require("webpack");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const pkg = require("./package.json");

let libraryName = pkg.name;

let plugins = [], outputFile;

if (env === "build") {
    plugins.push(new UglifyJsPlugin({
      minimize : true,
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      }
    }));
    outputFile = libraryName + ".min.js";
} else {
    outputFile = libraryName + ".js";
}


const config = {
    entry : __dirname + "/src/index",
    devtool : "source-map",
    output : {
        path : __dirname + "/lib",
        filename : outputFile,
        library : libraryName,
        libraryTarget : "umd",
        umdNamedDefine : true
    },
    module : {
        rules : [
            {
                test : /(\.jsx|\.js)$/,
                loader : "babel-loader",
                exclude : /(node_modules|bower_components)/,
                options: {
                  presets: ["env", "react", "stage-0"]
                }
            },
            {
                test : /\.css$/,
                loader : "style-loader!css-loader"
            },
            {
                test : /\.scss$/,
                loader : "style!css!sass?outputStyle=expanded&" + "includePaths[]=" +
                (path.resolve(__dirname, "./node_modules"))
            },
            {
                test : /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                loader : "url-loader?limit=30000&name=[name]-[hash].[ext]"
            }
        ]
    },
    resolve : { 
        modules : [path.resolve("./node_modules"), path.resolve("./src")],
        extensions : [".json", ".js"]
    },
    plugins : plugins
};

module.exports = config;