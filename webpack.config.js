const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'entry.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[hash].bundle.js',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	mode: process.env.NODE_ENV || 'development',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8080,
		hot: true,
		inline: true,
		host: '0.0.0.0',
		historyApiFallback: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new CleanWebpackPlugin(['dist/*.js', 'dist/*.html']),
		new HtmlWebpackPlugin({
			template: './templates/index.html',
			title: 'CashflowCalc.net',
		}),
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
			},
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'less-loader', options: { javascriptEnabled: true } },
				],
			},
		],
	},
};
