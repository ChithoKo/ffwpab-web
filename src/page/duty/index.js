/*
* @Author: CharlesKo
* @Date:   2017-10-13 15:49:00
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-02 17:22:05
*/

/*
* @Author: CharlesKo
* @Date:   2017-10-20 19:10:51
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-10-21 00:45:26
*/

require('./index.css');
require('page/common/navigate/index.js');
require('page/common/sub-navi/index.js');

var _common = require('util/common.js');

var templateHtml = require('./index.string');

var page = {
	duties : {
		dutyList : 'loading',
	},
	init : function(){
		_this = this;
		_common.requestCORS({
			method : 'post',
			url : "http://localhost/PHP_Project_One/manage/doLoad.php?act=getDuties",				//  CONNECT TO PHP HERE !!! USING CORS... NOTICE
			success : function(data, msg){
  				// alert('success');
  				_this.duties.dutyList = data;
  				// alert(_this.events.eventList[0].wkday);
  				_this.loadDutyInfo();
  			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
		this.bindEvent();
	},
	bindEvent : function(){
		
	},
	loadDutyInfo : function(){
		_this = this;
		var dutiesHtml = _common.renderHtml(templateHtml, {
			dutyList : _this.duties.dutyList,
		});
		$('.duties').html(dutiesHtml);

		$('.regisbutton').each(function(){
			var top = (parseInt($(this).parent().parent().css('height'), 10) - 35)/2;
			$(this).parent().css('top', top);
			// console.log(top + '\n');
		});
	}

};


$(function(){
	page.init();
})