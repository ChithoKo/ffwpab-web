/*
* @Author: CharlesKo
* @Date:   2017-11-11 19:55:23
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-16 03:56:54
*/

require('./index.css');
require('page/common/navigate/index.js');

var _common = require('util/common.js');

var memberRegisTemplate = require('./member-regis.string');
var dutyRegisTemplate = require('./duty-regis.string');
// var dutyTemplate = require('./index-duty.string');
// var eventTemplate = require('./index-event.string');
// var noticeTemplate = require('./index-notice.string');

var page = {
	memberRegis : 'loading',
	dutyRegis : 'loading',
	init : function(){
		var _this = this;
		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doLoad.php?act=getIndexAdmin',
			success : function(data, msg){
				
				_this.memberRegis = data.members;
				_this.dutyRegis = data.dutyAtds;

				_this.loadPageInfo();
				_this.bindEvent();
			},
			error : function(statusText){
				alert('error: ' + statusText);
			}
		});
	},
	bindEvent : function(){
		$('.side-bar ul .admin-logout').click(function(){
			_common.requestCORS({
				url : 'http://localhost/PHP_Project_One/manage/doLogin.php?act=adminLogout',
				success : function(data, msg){
					window.location.href = 'http://localhost:8088/dist/view/index.html';
				},
				error : function(statusText){
					alert('error: ' + statusText);
				}
			});
		});
	},
	loadPageInfo : function(){
		var _this = this;
		if(_this.memberRegis != 'loading'){
			var memberRegisCon = _common.renderHtml(memberRegisTemplate, {
				memberRegisList : _this.memberRegis
			});
			$('.member-regis-list .con-details').html(memberRegisCon);
			$('.member-regis-list .regis-con').each(function(){
				$(this).find('button').click(function(){
					_this.approveMember($(this).parent().parent());
				});
			});
		}
		
		if(_this.dutyRegis != 'loading'){
			var dutyRegisCon = _common.renderHtml(dutyRegisTemplate, {
				dutyRegisList : _this.dutyRegis
			});
			$('.duty-regis-list .con-details').html(dutyRegisCon);
			$('.duty-regis-list .regis-con').each(function(){
				$(this).find('.duty-approve').css('height', $(this).height());
				$(this).find('button').click(function(){
					_this.approveDutyAtd($(this).parent().parent());
				});
			});
		}
		
		
	},	
	// 
	approveMember : function(holder){
		var username = holder.find('.member-name').html();
		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=approveMember',
			method : 'post',
			data : {
				'username' : username
			},
			success : function(data, msg){
				holder.remove();
				// _this.memberRegis = data.members;
				// _this.dutyRegis = data.dutyAtds;

				// _this.loadPageInfo();
			},
			error : function(statusText){
				alert('error: ' + statusText);
			}
		});
	},
	// 
	approveDutyAtd : function(holder){
		// username, dutyname, atd_starttime, atd_endtime, 
		var username = holder.find('.duty-member').html();
		var dutyname = holder.find('.duty-name').html();
		var date = holder.find('.date-date').html();
		var starttime = holder.find('.starttime input').val();
		var endtime = holder.find('.endtime input').val();

		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=approveAtd',
			method : 'post',
			data : {
				'username' : username,
				'dutyname' : dutyname,
				'atd_starttime' : starttime,
				'atd_endtime' : endtime,
				'date' : date
			},
			// JSON.stringify()
			success : function(data, msg){
				holder.remove();
				// _this.memberRegis = data.members;
				// _this.dutyRegis = data.dutyAtds;

				// _this.loadPageInfo();
			},
			error : function(statusText){
				alert('error: ' + statusText);
			}
		});
	}
};

$(function(){
	page.init();
})