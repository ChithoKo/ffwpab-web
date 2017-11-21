/*
* @Author: CharlesKo
* @Date:   2017-10-16 19:39:14
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-14 15:39:24
*/

require('./index.css');
require('page/common/navigate/index.js');
require('page/common/sub-navi/index.js');

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
		// $('#add-event-admin .add-title').click(_common.showBox('add-event-admin',''));
		$('#add-event-admin .add-title').click(function(){
			_common.showBox('add-event-admin','');
		});
		$('#add-event-admin button').click(function(){
			// alert('btn clicked');
			page.addEventAdm();
		});
	},
	loadEventInfo : function(){
		_this = this;
		// 渲染 events 数据
		var eventsHtml = _common.renderHtml(templateHtml, {
			eventList : this.events.eventList
		});
		 // onclick="javascript:changeFormatInputEvent(this);"
		 // onclick="javascript:updateEventAdm(this, 17);"
		 // onclick="javascript:changeFormatTxtEvent(this);"
		// client.find('.eee').each(function()

		// $('.event-con .edit-btn').click(function(){
		// 	alert('edit btn here');
		// });

		
		// 
		$('.event-list').html(eventsHtml);
		// alert($('.event-list .event-con .edit-btn').length);
		$('.event-list .event-con .edit-btn').each(function(){
			$(this).click(function(){
				// $(this).css('background', 'pink');
				_this.changeFormatInputEvent($(this));
			})
			// alert($(this).css('background'));
		});
		$('.event-list .event-con .del-btn').each(function(){
			$(this).click(function(){
				// $(this).css('background', 'pink');
				_this.delEventAdm($(this).parent().parent());
			})
			// alert($(this).css('background'));
		});
		$('.event-list .event-con .submit-btn').each(function(){
			$(this).click(function(){
				_this.updateEventAdm($(this), parseInt($(this).parent().parent().find('.idvalue').text()));
				// alert(typeof(parseInt($(this).parent().parent().find('.idvalue').text())));
			})
		});
		$('.event-list .event-con .cancel-btn').each(function(){
			$(this).click(function(){
				_this.changeFormatTxtEvent($(this));
			})
		});


		// http://localhost/PHP_Project_One/webpage/event_admin.php
		// /Applications/XAMPP/xamppfiles/htdocs/PHP_project_ONE/manage/doLoad.php

		// alert('loading');
		// _common.request({
		// 	method : 'get',
		// 	url : 'http://localhost/PHP_Project_One/manage/doLoad.php?act=getEvents',
		// 	dataType : "jsonp",
		// 	jsonp : "callback",
		// 	success : function(data, msg){
		// 		// alert('msg is : ' + msg);
		// 	},
		// 	error : function(msg){
		// 		alert('err msg is : ' + msg);
		// 	}
		// });

		// $.ajax({  
  //                   type : "GET",  
  //                   url : "http://localhost/PHP_Project_One/manage/doLoad.php?act=getEvents",  
  //                   dataType: 'json',
  //                   xhrFields : {
  //                   	withCredentials : true
  //                   },
  //                   // xhrFields: 'Access-Control-Allow-Origin': '*',  
	 //                // jsonp:'callback',
	 //                // jsonpCallback: 'searchJsonCallback', 
  //                   success : function(data) {                         
  //                       // alert('data msg : ' + data.data[0].starttime);
  //                   },  
  //                   error : function(jqXHR) {  
  //                       alert("发生错误"+data.msg);  
  //                   }  
  //               }); 

  		// _this = this;

  		// _common.requestCORS({
  		// 	url : "http://localhost/PHP_Project_One/manage/doLoad.php?act=getEvents",
  		// 	success : function(data, msg){
  		// 		alert('success');
  		// 		// this.events.eventList = data;
  		// 		// alert('data msg : ' + data[0].starttime);
  		// 		// alert('data msg : ' + _this.events.eventList[0].starttime);
  		// 		// return data;

  		// 		_this.events.eventList = data;
  		// 		// alert(_this.events.eventList[0].starttime);
  		// 	},
  		// 	error : function(statusText){
  		// 		alert("发生错误"+data.msg);
  		// 	}
  		// });

  		// alert('finished');
	},
	changeFormatInputEvent : function(obj){
		var client = $(obj).parent().parent();
		var txtval = null;

		client.find('.edit-btn').css('display', 'none');
		client.find('.submit-btn').css('display', 'inline-block');
		client.find('.cancel-btn').css('display', 'inline-block');

		client.find('.editable-input').each(function(){
			txtval = $(this).find('span').text();
			$(this).html("<input type='text' name='event' value='" + txtval + "' />");
			// alert($(this).attr('class').split(" ")[0]);
		});
		client.find('.editable-textarea').each(function(){
			txtval = $(this).find('span').text();
			$(this).html("<textarea>" + txtval + "</textarea>");
		});

		client.find('.del-btn').hide();
	},
	// update duty info with data in input form in web page
	updateEventAdm : function(obj, meetid){

		// var idname='#eventof_' + did;
		var client = $(obj).parent().parent();
		// alert(client.attr('class'));
		var txtval = null;
		// var url = 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=updateEvent';			//  CONNECT TO PHP HERE !!! USING CORS... NOTICE

		var data = {};
		data['meetid'] = meetid;
		client.find('.editable-input').each(function(){
			txtval = $(this).find('input').val();
			data[$(this).attr('class').split(" ")[0]] = txtval;
		});
		client.find('.editable-textarea').each(function(){
			txtval = $(this).find('textarea').val();
			data[$(this).attr('class').split(" ")[0]] = txtval;
		});

		// data = JSON.stringify(data);

		// var success = function(response){
		// 	// alert("result is : " + response.msg);
		// 	showServerRes(response.msg);
		// }
		var type='json';

		// alert(data);
		// $.post(url, data, success, type);

		_common.requestCORS({
			method : 'post',
  			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=updateEvent',			//  CONNECT TO PHP HERE !!! USING CORS... NOTICE,
  			data : data,
  			success : function(data, msg){
				// alert("result is : " + msg);
				_common.showServerRes(msg);

				_this.changeFormatTxtEvent(obj);
				client.find('.edit-btn').show();
				client.find('.del-btn').show();
				client.find('.submit-btn').hide();
				client.find('.cancel-btn').hide();
			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
  		});

		// _this.changeFormatTxtEvent(obj);
		// client.find('.edit-btn').show();
		// client.find('.del-btn').show();
		// client.find('.submit-btn').hide();
		// client.find('.cancel-btn').hide();
		// changeFormatToTxt(meetid);		//
	},
	changeFormatTxtEvent : function(obj){
		var client = $(obj).parent().parent();
		var txtval = null;
		client.find('.editable-input').each(function(){
			txtval = $(this).find('input').val();
			$(this).html("<span>" + txtval + "</span>");
		});
		client.find('.editable-textarea').each(function(){
			txtval = $(this).find('textarea').val();
			$(this).html("<span>" + txtval + "</span>");
		});

		client.find('.edit-btn').show();
		client.find('.del-btn').show();
		client.find('.submit-btn').hide();
		client.find('.cancel-btn').hide();
	},
	addEventAdm : function(){
		var data = {
			'eventname': $('.add-event .add-eventname input').val(), 'venue': $('.add-event .add-venue input').val(), 
			'date': $('.add-event .add-day').val() + '/' + $('.add-event .add-month').val() + '/' + $('.add-event .add-year').val(), 
			'starttime': $('.add-event .add-starttime').val(), 'endtime': $('.add-event .add-endtime').val(), 'note': $('.add-event .add-note textarea').val(),
			'pic': $('.add-event .add-pic input').val()
		};

		if(data.eventname=='' || data.venue=='' || data.starttime=='' || data.endtime==''){
			return false;
		}

		// alert(data.pic);

		_common.requestCORS({
			method : 'post',
			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=addEvent',			//  CONNECT TO PHP HERE !!! USING CORS... NOTICE,
			data : data,
			success : function(data, msg){
				// alert("result is : " + msg);
				_common.showServerRes(msg);
				$('.add-event input').val('');
				$('.add-note textarea').val('');
			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
	},
	delEventAdm : function(obj){
		var data = {
			eventname : obj.find('.eventname span').html(),
			date : obj.find('.event-date span').html(),
			starttime : obj.find('.event-starttime span').html()
		};

		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=delEvent',
			method : 'post',
			data : data,
			success : function(res, msg){
				obj.remove();
			},
			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
	}
};

$(function(){
	page.init();
	//alert('init ed');
});