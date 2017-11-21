/*
* @Author: CharlesKo
* @Date:   2017-10-13 18:00:02
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-13 04:18:10
*/

var _common = require('util/common.js');

var _duty = {
	addAtd : function(did){
		var _this = this;
		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=getAtdList',
			data : {'did':did},
			method : 'post',
			success : function(res, msg){
				var mids = res.mids;
				var memNames = res.memNames;
				var pendingmids = res.pendingmids;
				var waitingmids = res.waitingmids;

				var memList = [];
				for(var i=0; i<mids.length; i++){
					memList[i] = [mids[i], memNames[i]];
				}

				_common.showPopUpLayer();
				_this.addPopupTitle();

				_this.addAtdLayer(memList, pendingmids, waitingmids);
				var layerBox = $('.layer-box');
				_common.setPopupLayerPosition(layerBox);
				_common.fixElement('.popup-layer .layer-head');
				_common.fixElement('.popup-layer .layer-bottom');

				$('.popup-layer .layer-bottom button').click(function(){
					_this.submitAtdList(did);
				});

				$('.layer-head img').click(function(){
					_common.removeLayer();
				});
				$('.layer-mask').click(function(){
					_common.removeLayer();
				});
			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
	},
	// 
	addPopupTitle : function(){
		var popupLayer = $(".popup-layer");
		var layerBox = $("<div class='layer-box'></div>");
		var layerHead = $("<div class='layer-head'>選擇隊員<img src='../../src/image/princess1.jpeg' /></div>");
		layerHead.appendTo(layerBox);
		var layerCon = $("<div class='layer-con'></div>");
		layerCon.appendTo(layerBox);
		var layerBottom = $("<div class='submit-btn layer-bottom'><button>Submit</button></div>");
		layerBottom.appendTo(layerBox);
		layerBox.appendTo(popupLayer);
	},
	// 
	addAtdLayer : function(memList, pendingmids, waitingmids){
		var layerMember;
		for(var i=0; i<memList.length; i++){
			layerMember = null;
			layerMember = $("<div class='layer-member'><input type='checkbox' name='member' id='mid-" + memList[i][0] + "' value='" + memList[i][0] + "' ><label for='mid-" + memList[i][0] + "'><img src='../../src/image/princess1.jpeg' /><p class='mem-name'>" + memList[i][1] + "</p></label></div>");
			if(pendingmids.includes(memList[i][0])){
				$("<span> (Request sent) </span>").appendTo(layerMember.find('p'));
			}
			if(waitingmids.includes(memList[i][0])){
				$("<span> (Waiting for accept) </span>").appendTo(layerMember.find('p'));
			}
			layerMember.appendTo($('.layer-con'));
		}
	},
	// 
	submitAtdList : function(did){
		var mids = [];
		$('.layer-con input:checkbox:checked').each(function(){
			mids.push($(this).val());
		});

		if(mids.length == 0){
			return false;
		}

		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=addAtdAdm',
			method : 'post',
			data : {
				'did' : did,
				'mids' : mids
			},
			success : function(res, msg){
				showServerRes(res.msg);
				if(res.errno == 0){
					$('.layer-mask').remove();
					$('.popup-layer').remove();
				}
			},
			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
	},
	// 
	submitDutyUpdate : function(holder){
		var data = {
			ori_dutyname : holder.find('.regis-event input').attr('data-origin-formval'),
			ori_date : holder.find('.date input').attr('data-origin-formval'),
			ori_starttime : holder.find('.starttime input').attr('data-origin-formval')
		};
		holder.find('.editable-input').each(function(){
			var postTitle = $(this).attr('data-event-attr');
			var postVal = $(this).find('input').val();
			data[postTitle] = postVal;
		});
		holder.find('.editable-textarea').each(function(){
			var postTitle = $(this).attr('data-event-attr');
			var postVal = $(this).find('textarea').val();
			data[postTitle] = postVal;

		});

		// _common.dumpObj(data);
		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=updateDuty',
			method : 'post',
			data : data,
			success : function(res, msg){
				_common.finishEditForm(holder);
			},
			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
		// holder.find('.editbutton').show();
		// holder.find('.delbutton').show();
		// holder.find('.finishbutton').hide();
		// holder.find('.cancelbutton').hide();
	},
	// 
	deleteDuty : function(holder){
		var data = {
			dutyname : holder.find('.regis-event span').html(),
			date : holder.find('.date span').html(),
			starttime : holder.find('.starttime span').html()
		};

		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doAdminAction.php?act=delDuty',
			method : 'post',
			data : data,
			success : function(res, msg){
				holder.remove();
			},
			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
	}
};

module.exports = _duty;

