/*
* @Author: CharlesKo
* @Date:   2017-11-07 17:19:22
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-17 00:22:31
*/

var _common = require('util/common.js');

var _image = {
	uploadImgAsync : function(param){
	    $.ajax({
	        // Your server script to process the upload
	        type : 'POST',
	        url : param.url || '',
	        xhrFields : param.xhrFields || {
	                	withCredentials : true
	                },

	        // Form data
	        dataType : 'json',
	        data : new FormData($('form')[0]),

	        // Tell jQuery not to process data or worry about content-type
	        // You *must* include these options!
	        cache : false,
	        contentType : false,
	        processData : false,

	        success : function(res){
				// request success
				if(0 === res.errno){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// 
				if(-1 === res.errno){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// do not login yet, need to make user to login before use
				else if(10 === res.errno){
					_this.doLogin();
				}
				// 请求数据错误
				else if(1 === res.errno){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},	
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
	    });
	},
	addIconImg : function(path, photoname){
		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doFile.php?act=addIconImg',
			method : 'post',
			data : {
				abid : 1,
				iconname : photoname
			},
			success : function(data, msg){
  				_common.showPopUpLayer();
  				_common.editImgInfo(path + photoname);
  				_common.cropImg();
  			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
	}

};

module.exports = _image;

