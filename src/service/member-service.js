/*
* @Author: CharlesKo
* @Date:   2017-10-13 17:59:20
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-15 18:28:23
*/

var _common = require('util/common.js');

var _member = {
	addNote : function(note){
		var _this = this;
		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doMemberAction.php?act=editPersonalNote',
			data : {'note':note},
			method : 'post',
			success : function(res, msg){
				// alert(msg);
			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
	}
	
};

module.exports = _member;