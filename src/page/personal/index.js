/*
* @Author: CharlesKo
* @Date:   2017-10-13 15:49:28
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-17 00:20:20
*/

require('./index.css');
require('page/common/navigate/index.js');

var _common = require('util/common.js');
var _image = require('service/image-service.js');
var _member = require('service/member-service.js');
var _postresponse = require('service/postresponse-service.js');

var templateHtml = require('./index.string');

var page = {

	duties : {
		dutyList : 'loading'
	},
	images : 'loading',
	iconImgs : 'loading',
	path : '../../src/image/',
	init : function(){
		var _this = this;

		_common.requestCORS({
			url : "http://localhost/PHP_Project_One/manage/doLoad.php?act=getPersonal",				//  CONNECT TO PHP HERE !!! USING CORS... NOTICE
  			success : function(data, msg){
  				// alert('success');
  				$('#user-name h1').html(data.member['username']);
  				$('#user-post h1').html(data.member['title'] + ' ' + data.member['tnum']);
  				$('#workingHrs span').html(data.member['dutyHrs']);
  				$('#meetingHrs span').html(data.member['meetHrs']);
  				$('#user-status .status-note').html(data.member['note']);
  				_this.duties.dutyList = data.duties;
  				_this.images = data.images;
  				_this.iconImgs = data.iconImgs;
  				// alert(_this.events.eventList[0].wkday);

  				var usericonWidth = $('#user-icon').width() - 25;
  				$('#user-icon .img-holder img').attr('src', _this.path + '/cropped/350/' + _this.iconImgs[0]['imagename']);
  				$('#user-icon .img-holder').css('width', usericonWidth);
  				// $('#nav-user img').attr('src', _this.path + '50/' + _this.images[1]['imagename']);

  				_this.loadPageInfo();
  				_this.bindEvent();
  			},
  			error : function(statusText){
  				alert("发生错误"+statusText);
  			}
		});
	},
	bindEvent : function(){
		var _this = this;

		$('#user-status .editicon').click(function(){
			var noteTxt = $('#user-status .status-note').html();
			var inputTxt = $("<div id='editableDiv' onclick=\"document.getElementById('editableDiv').focus()\" contenteditable='true' data-text='You can write sth here...'>" + noteTxt + "</div><button>完成</button>");
			$('#user-status .status-note').html(inputTxt);
			$('#user-status .status-note').find('#editableDiv').focus();

			$('#user-status .status-note').find('button').click(function(){
				var inputNote = $('#user-status .status-note').find('#editableDiv').html();
				_member.addNote(inputNote);
				$('#user-status .status-note').html(inputNote);
			});
		});

		$('#event-tap .tap-upcoming').click(function(){
			$('.upcoming').show();
			$('.finished').hide();
			$('.gallery').hide();
		});
		$('#event-tap .tap-finished').click(function(){
			$('.upcoming').hide();
			$('.finished').show();
			$('.gallery').hide();
		});
		$('#event-tap .img-album').click(function(){
			$('.upcoming').hide();
			$('.finished').hide();
			$('.gallery').show();
		});
		$('#event-tap .event-tap').each(function(){
			$(this).click(function(){
				$(this).addClass('acting');
				$(this).siblings().removeClass('acting');
			});
		});
		$(':file').on('change', function(){
			_image.uploadImgAsync({
				url : 'http://localhost/PHP_Project_One/manage/doFile.php?act=addImg',
				success : function(data, msg){
					_image.addIconImg(_this.path, data[0]['name']);
					// alert(data[0]['name']);
					// var imgTmp = _this.path + data[0]['name'];

	  				// _common.showPopUpLayer();
	  				// _common.editImgInfo(_this.path + data[0]['name']);
	  				// _common.cropImg();
	  			},
	  			error : function(statusText){
	  				alert("发生错误"+data.msg);
	  			}
			});
		});
		var iconImg = $('#user-icon img').attr('src');
		iconImg = iconImg.replace('/cropped/', '');

		$('#user-icon img').click(function(){
			// alert('img clicked');
			_common.showPopUpLayer();
			_common.showImgPost(iconImg);
			_postresponse.getPostresponse();

			$('.comment-submit button').click(function(){
				_postresponse.addPostresponse();
			});
			
			// _common.editImgInfo(iconImg);
	  // 		_common.cropImg();
			// _common.editImgInfo(iconImg);
			// alert('img clicked finished');
		});

		
	},
	loadPageInfo : function(){
		_this = this;
		var dutyHtml = _common.renderHtml(templateHtml, {
			dutyList : _this.duties.dutyList
		});
		$('#event').html(dutyHtml);
		
		for(var i=0; i<_this.images.length; i++){
			var galleryTemplate = $("<div class='gallery-img'><div class='img-helper'></div><img src=''><div class='img-cover'></div></div>");
			// galleryTemplate.css('height', galleryTemplate.css('width'));
			galleryTemplate.find('img').attr('src', _this.path + '350/' + _this.images[i]['imagename']);
			galleryTemplate.appendTo($('.gallery'));
		}

		$('.gallery-img').each(function(){
			var imagename = $(this).find('img').attr('src');
			imagename = imagename.replace('220/', '800/');
			$(this).css('height', $(this).parent().width()*3/10);
			
			$(this).find('.img-cover').click(function(){
				_common.showPopUpLayer();
				_common.showImgPost(imagename);
				_postresponse.getPostresponse();

				$('.comment-submit button').click(function(){
					_postresponse.addPostresponse($('.comment-submit'));
				});
				// alert(imagename);
			});
		});
	},
	// showImgPost : function(){
	// 	_common.showPopUpLayer();

	// }
};

$(function(){
	page.init();
})