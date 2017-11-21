/*
* @Author: CharlesKo
* @Date:   2017-10-20 19:10:51
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-13 04:24:55
*/

require('./index.css');
require('page/common/navigate/index.js');
require('page/common/sub-navi/index.js');

var _common = require('util/common.js');
var _duty = require('service/duty-service.js');

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

  				$('.idvalue').css('display', 'none');
  			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
		this.bindEvent();
	},
	bindEvent : function(){
		$('#addduty .addtitle').click(function(){
			// alert('clicked');
			_common.showBox('addduty','');
		});
	},
	loadDutyInfo : function(){
		_this = this;
		var dutiesHtml = _common.renderHtml(templateHtml, {
			dutyList : _this.duties.dutyList,
		});
		$('.duties').html(dutiesHtml);

		$('.memberadd').each(function(){
			$(this).click(function(){
				var did = parseInt($(this).prev('.idvalue').find('span').html());
				_duty.addAtd(did);
				// alert(typeof(parseInt($(this).prev('.idvalue').find('span').html())));
			});
		});

		$('.editbutton').each(function(){
			$(this).parent().parent().css('height', $(this).parent().parent().parent().height());
			$(this).click(function(){
				_common.editForm($(this).parent().parent().parent());
			});
			// console.log(top + '\n');
		});

		$('.cancelbutton').each(function(){
			$(this).parent().parent().css('height', $(this).parent().parent().parent().height());
			$(this).click(function(){
				_common.cancelEditForm($(this).parent().parent().parent());
			});
			// console.log(top + '\n');
		});

		$('.finishbutton').each(function(){
			$(this).parent().parent().css('height', $(this).parent().parent().parent().height());
			$(this).click(function(){
				_duty.submitDutyUpdate($(this).parent().parent().parent());
			});
			// console.log(top + '\n');
			// _duty.deleteDuty($(this).parent().parent().parent());
				// alert('hi');
		});

		$('.delbutton').each(function(){
			$(this).parent().parent().css('height', $(this).parent().parent().parent().height());
			$(this).click(function(){
				_duty.deleteDuty($(this).parent().parent().parent());
				// alert('hi');
			});
			// console.log(top + '\n');
			
		});
		
			// alert(parseInt($(this).parent().parent().css('height')));
			// var top = (parseInt($(this).parent().parent().css('height'), 10) - 62)/2;
			// $(this).parent().css('top', top);
			// console.log(top + '\n');
		
	},
	changeFormatToInput : function(){},
	updateDutyAdm : function(){},
	cancelEdit : function(){},
	delDuty : function(){}

};


$(function(){
	page.init();
})