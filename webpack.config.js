const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: "node",
    entry: ["@babel/polyfill", "./index"],
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PORT: JSON.stringify(process.env.PORT),
                MYSQL_HOST: JSON.stringify(process.env.MYSQL_HOST),
                MYSQL_USER: JSON.stringify(process.env.MYSQL_USER),
                MYSQL_PASSWORD: JSON.stringify(process.env.MYSQL_PASSWORD),
                MYSQL_DB: JSON.stringify(process.env.MYSQL_DB),
            },
        }),
    ],
    output: {
        path: path.resolve("dist"),
        filename: "server.js",
    },
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader"
            }
        }, ]
    }
};