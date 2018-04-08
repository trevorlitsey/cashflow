const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, 'src', 'entry.js'),
	output: {
		path: path.resolve(__dirname, 'docs'),
		filename: 'bundle.js',
	},
	mode: process.env.NODE_ENV || 'development',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8080,
		hot: true,
		inline: true,
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new UglifyJsPlugin({
			exclude: 'node_modules/',
			sourceMap: true
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