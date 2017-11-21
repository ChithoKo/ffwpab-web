/*
* @Author: CharlesKo
* @Date:   2017-10-13 02:21:53
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-16 04:00:55
*/

require('./index.css');

var _common = require('util/common.js');
var _image = require('service/image-service.js');

var navoptionsTemplate = require('./index.string');

var _navigate = {
	path : '../../../src/image/cropped/50/',
	images : 'loading',
	navoptions : 'loading',
	init : function(){
		var _this = this;
		_common.requestCORS({
			method : 'get',
			url : "http://localhost/PHP_Project_One/manage/doLoad.php?act=getNavi",				//  CONNECT TO PHP HERE !!! USING CORS... NOTICE
			success : function(data, msg){
  				// alert('success');
  				_this.images = data.images;
  				$('#nav-user img').attr('src', _this.path + _this.images[0]['imagename']).attr('alt', data.mid);

  				_this.navoptions = data.navoptions;
  				var navoptionsHtml = _common.renderHtml(navoptionsTemplate, {
  					navoptions : _this.navoptions
  				});
  				$('#nav-options ul').html(navoptionsHtml);

  				$('#nav-icon a').attr('href', data.iconLink);

  				_this.bindEvent();
  			},
  			error : function(statusText){
  				alert("发生错误"+statusText);
  			}
		});
	},
	bindEvent : function(){
		$('#user-options .logout').click(function(){
			_common.requestCORS({
				method : 'post',
				url : "http://localhost/PHP_Project_One/manage/doLogin.php?act=logout",				//  CONNECT TO PHP HERE !!! USING CORS... NOTICE
				success : function(data, msg){
	  				window.location.href = 'http://localhost:8088/dist/view/user-login.html';
	  			},
	  			error : function(statusText){
	  				alert("发生错误"+statusText);
	  			}
			});
		});

		$('#user-options .admin-login').click(function(){
			_common.requestCORS({
				method : 'post',
				url : "http://localhost/PHP_Project_One/manage/doLogin.php?act=adminLogin",				//  CONNECT TO PHP HERE !!! USING CORS... NOTICE
				success : function(data, msg){
	  				window.location.href = 'http://localhost:8088/dist/view/index_admin.html';
	  			},
	  			error : function(statusText){
	  				alert("发生错误"+statusText);
	  			}
			});
		});
	}
};

module.exports = _navigate.init();