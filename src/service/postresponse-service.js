/*
* @Author: CharlesKo
* @Date:   2017-11-10 18:14:04
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-15 16:58:47
*/

var _common = require('util/common.js');

var postresponseTemplate = require('page/common/postresponse.string');

var _postresponse = {
	// 
	postresponses : 'loading',
	// 
	getPostresponse : function(){
		var imgArr = $('.photo-con .photo img').attr('src').split('/');
		var imagename = imgArr[imgArr.length - 1];
		var _this = this;

		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doPost.php?act=getPostresponses',
			data : {
				'imagename' : imagename
			},
			method : 'post',
			success : function(data, msg){
				this.postresponses = data;

				var postresponsesHtml = _common.renderHtml(postresponseTemplate, {
					postresponses : this.postresponses
				});
				$('.photo-con .post-comment').html('');
				$('.photo-con .post-comment').html(postresponsesHtml);
				$('.outer-reply').each(function(){
					$(this).click(function(){
						var commentreplies = $(this).parent().parent().siblings('.comment-replies');
						_common.commentSubmitHtml(commentreplies, commentreplies.siblings('.comment-img').find('img').attr('alt'));
						_common.setCommentSubmitHtmlCss(commentreplies, commentreplies.width());

						commentreplies.find('button').click(function(){
							_this.addPostresponse(commentreplies);
						});
					});
				});
				$('.comment-reply-con .comment-reply').each(function(){
					$(this).click(function(){
						var commentreplies = $(this).parent().parent().parent().parent();
						var replyCon = $(this).parent().parent().parent();
						_common.commentSubmitHtml(commentreplies, replyCon.find('.comment-img img').attr('alt'));
						_common.setCommentSubmitHtmlCss(commentreplies, commentreplies.width());
						

						commentreplies.find('button').click(function(){
							_this.addPostresponse(commentreplies);
						});
					});
				});
			},
  			error : function(statusText){
  				alert("发生错误"+statusText);
  			}
		});
	},
	// 
	addPostresponse : function(inputContainer){
		// var commentSubmit = $('.photo-con .comment-submit');
		var _this = this;
		var content = inputContainer.find('input').val();
		var imgArr = $('.photo-con .photo img').attr('src').split('/');
		var imagename = imgArr[imgArr.length - 1];
		var parentprid = parseInt(inputContainer.find('input').attr('name'), 10);


		_common.requestCORS({
			url : 'http://localhost/PHP_Project_One/manage/doPost.php?act=addPostresponse',
			data : {
				'imagename' : imagename,
				'parentprid' : parentprid,
				'content' : content
			},
			method : 'post',
			success : function(data, msg){
				inputContainer.find('input').val('');
				_this.getPostresponse();
			},
  			error : function(statusText){
  				alert("发生错误"+statusText);
  			}
		});
	},
	// 
	delPostresponse : function(){}
};

module.exports = _postresponse;