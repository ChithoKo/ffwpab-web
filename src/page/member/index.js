/*
* @Author: CharlesKo
* @Date:   2017-10-13 15:49:16
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-18 19:01:17
*/

require('./index.css');
require('page/common/navigate/index.js');
require('page/common/sub-navi/index.js');

var _common = require('util/common.js');

var templateHtml = require('./index.string');

var page = {
	imgPath : '../../src/image/',
	members : {
		memberList : 'loading',
	},
	init : function(){
		_this = this;
  		_common.requestCORS({
  			method : 'post',
  			url : "http://localhost/PHP_Project_One/manage/doLoad.php?act=getMembers",				//  CONNECT TO PHP HERE !!! USING CORS... NOTICE
  			success : function(data, msg){
  				// alert('success');
  				_this.members.memberList = data;
  				// alert(_this.events.eventList[0].wkday);
  				_this.loadMemberInfo();
  			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
  		});
	},
	bindEvent : function(){},
	loadMemberInfo : function(){
		_this = this;
		var membersHtml = _common.renderHtml(templateHtml, {
			memberList : _this.members.memberList,
		});

		$('.members').html(membersHtml);
		
	},
};


$(function(){
	page.init();
});