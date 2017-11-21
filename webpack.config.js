/*
* @Author: CharlesKo
* @Date:   2017-10-11 13:48:00
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-11 19:57:13
*/

const path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置， 'dev' / 'online'
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// 获取 html-webpack-plugin 参数的方法
var getHtmlConfig = function(name, title){
	return {
		template	: './src/view/' + name + '.html',
    	filename	: 'view/' + name + '.html',
        title       : title,
    	inject		: true,
   		hash		: true,
   		chunks		: ['common', name],
	};
};

// webpack configs
var config = {
    entry: {
    	'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
    	'index_admin' : ['./src/page/index_admin/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'duty' : ['./src/page/duty/index.js'],
        'event' : ['./src/page/event/index.js'],
        'event_admin' : ['./src/page/event_admin/index.js'],
        'duty_admin' : ['./src/page/duty_admin/index.js'],
        'member' : ['./src/page/member/index.js'],
    	'personal' : ['./src/page/personal/index.js'],
    },
    output: {
    	// path 配置的是 存放文件的路径
        path: path.resolve(__dirname, 'dist'),
        // public path 配置的是 访问文件时的路径
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
    	'jquery': 'window.jQuery'
    },
    module: {
    	loaders: [
    		{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
    		{ test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/, loader: "url-loader?limit=100&name=resource/[name].[ext]" },
            { test: /\.string$/, loader: 'html-loader'}
    	]
  	},
    resolve: {
        alias: {
            node_modules : __dirname + '/node_modules',
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image : __dirname + '/src/image',
        },
    },
    plugins: [
    	// 独立通用模块到 js/base.js
    	new webpack.optimize.CommonsChunkPlugin({ 
    		name : 'common',
    		filename : 'js/base.js'
    	}),
    	// 把 css 单独打包到文件里
    	new ExtractTextPlugin("css/[name].css"),
    	// html 模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '')),
    	new HtmlWebpackPlugin(getHtmlConfig('index_admin', 'Admin')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '登錄')),
        new HtmlWebpackPlugin(getHtmlConfig('duty', '當更')),
        new HtmlWebpackPlugin(getHtmlConfig('event', '集會')),
        new HtmlWebpackPlugin(getHtmlConfig('event_admin', '集會編輯')),
        new HtmlWebpackPlugin(getHtmlConfig('duty_admin', '編更編輯')),
        new HtmlWebpackPlugin(getHtmlConfig('member', '會員')),
    	new HtmlWebpackPlugin(getHtmlConfig('personal', '个人')),
    ]
};

if('dev' == WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;