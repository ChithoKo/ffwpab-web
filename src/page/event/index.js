/*
* @Author: CharlesKo
* @Date:   2017-10-13 15:49:07
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-13 05:15:57
*/

require('./index.css');
require('page/common/navigate/index.js');
require('page/common/sub-navi/index.css');

var _common = require('util/common.js');

var templateHtml = require('./index.string');

var page = {
	// 
	events : {
		eventList : 'loading'
	},
	init : function(){
		var _this = this;
  		_common.requestCORS({
  			url : "http://localhost/PHP_Project_One/manage/doLoad.php?act=getEvents",				//  CONNECT TO PHP HERE !!! USING CORS... NOTICE
  			success : function(data, msg){
  				// alert('success');
  				_this.events.eventList = data;
  				// alert(_this.events.eventList[0].wkday);
  				_this.loadEventInfo();
  			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
  		});
		// this.loadEventInfo();
		// this.events.eventList = 'load finished';
		this.bindEvent();
	},
	bindEvent : function(){
		
	},
	loadEventInfo : function(){
		_this = this;
		// 渲染 events 数据
		var eventsHtml = _common.renderHtml(templateHtml, {
			eventList : this.events.eventList
		});
		// 
		$('.event-list').html(eventsHtml);

	}
};

$(function(){
	page.init();
	//alert('init ed');
});