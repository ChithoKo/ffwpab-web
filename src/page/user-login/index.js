/*
* @Author: CharlesKo
* @Date:   2017-10-11 13:48:50
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-15 21:31:28
*/

require('./index.css');

var _common = require('util/common.js');

// 表单里的错误提示
var formErr = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};

var page = {
	init : function(){
		this.bindEvent();
		var verify = _common.getUrlParam('verify');
		if(verify){
			alert(verify);
		}
	},
	bindEvent : function(){
		var _this = this;
		// 
		$(".choiceOption").click(function() {
			$(this).addClass("activeOption").siblings().removeClass("activeOption");
			if($('#loginOption').hasClass("activeOption")){
				// $('#loginForm').css('display', 'block');
				// $('#regisForm').css('display', 'none');
				$('#loginForm').show();
				$('#regisForm').hide();
			}else{
				// $('#regisForm').css('display', 'block');
				// $('#loginForm').css('display', 'none');
				$('#regisForm').show();
				$('#loginForm').hide();
			}
		});
		// 
		$('#submitLog button').click(function(){
			// _this.submit();
		})
		// 
		$('#submitReg button').click(function(){
			_this.register();
		})
	},
	submit : function(){
		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doLogin.php?act=login',
			success : function(data, msg){
				alert('success');
			},
			error : function(statusText){
				alert('error: ' + statusText);
			}
		});
	},
	register : function(){
		// alert('regis');
	},
	formValidate : function(){}
};

$(function(){
	page.init();
})

