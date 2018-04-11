const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'entry.js'),
	output: {
		path: path.resolve(__dirname, 'docs'),
		filename: 'bundle.js',
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	mode: process.env.NODE_ENV || 'development',
	devServer: {
		contentBase: path.join(__dirname, 'docs'),
		compress: true,
		port: 8080,
		hot: true,
		inline: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new HtmlWebpackPlugin({
			template: './templates/index.html',
			title: 'CashflowCalc.net',
			// meta: {
			// 	name: 'viewport',
			// 	content: 'width=device-width, initial-scale=1.0',
			// 	httpEquiv: 'X-UA-Compatible',
			// 	content: 'ie=edge',
			// },
		}),
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				]
			},
			{
				test: /\.less$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "less-loader", options: { javascriptEnabled: true } }
				]
			}
		]
	}
};