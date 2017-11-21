/*
* @Author: CharlesKo
* @Date:   2017-10-11 12:08:22
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-11 20:02:02
*/

require('./index.css');
require('page/common/navigate/index.js');

var _common = require('util/common.js');

var dutyTemplate = require('./index-duty.string');
var eventTemplate = require('./index-event.string');
var noticeTemplate = require('./index-notice.string');

var page = {
	duties : {
		dutyList : 'loading'
	},
	events : {
		eventList : 'loading'
	},
	notices : {
		noticeList : 'loading'
	},
	init : function(){
		var _this = this;
		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doLoad.php?act=getIndex',
			success : function(data, msg){
				_this.duties.dutyList = data.duties;
				_this.events.eventList = data.events;
				_this.notices.noticeList = data.notices;

				_this.loadPageInfo();
			},
			error : function(statusText){
				alert('error: ' + statusText);
			}
		});
		this.bindEvent();
	},
	bindEvent : function(){
		$('#duty-list').click(function(){
			$('.duty-container').show();
			$('.event-container').hide();
			$('#duty-list').css('border-bottom', '3px solid #c60023');
			$('#event-list').css('border-bottom', 'none');

		});
		$('#event-list').click(function(){
			$('.duty-container').hide();
			$('.event-container').show();
			$('#duty-list').css('border-bottom', 'none');
			$('#event-list').css('border-bottom', '3px solid #c60023');
		});
	},
	loadPageInfo : function(){
		var _this = this;
		var dutiesHtml = _common.renderHtml(dutyTemplate, {
			dutyList : _this.duties.dutyList
		});
		$('.duty-container').html(dutiesHtml);
		var eventsHtml = _common.renderHtml(eventTemplate, {
			eventList : _this.events.eventList
		});
		$('.event-container').html(eventsHtml);
	},
};

$(function(){
	page.init();
});