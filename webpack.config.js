const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/router.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	mode: 'development',
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				]
			}
		]
	}
};