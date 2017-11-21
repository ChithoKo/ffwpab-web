/*
* @Author: CharlesKo
* @Date:   2017-10-11 21:54:42
* @Last Modified by:   CharlesKo
* @Last Modified time: 2017-11-16 01:53:35
*/

// 因为接口地址和当前静态文件地址是一样的，所以 serverHost 用 '' 
var conf = {
	serverHost : ''
};
var Hogan = require('hogan.js');

var _common = {
	// 网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type : param.method || 'get',
			url : param.url || '',
			dataType : param.dataType || 'json',
			data : param.data || '',
			jsonp : param.jsonp || '',
			success : function(res){
				// request success
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// do not login yet, need to make user to login before use
				else if(10 === res.status){
					_this.doLogin();
				}
				// 请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},	
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	// 
	requestCORS : function(param){
		var _this = this;
		$.ajax({
			type : param.method || 'get',
			url : param.url || '',
			dataType : param.dataType || 'json',
			xhrFields : param.xhrFields || {
                    	withCredentials : true
                    },
			data : param.data || '',
			jsonp : param.jsonp || '',
			// contentType: 'application/json',
			success : function(res){

				// request success
				if(0 === res.errno){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// 
				if(-1 === res.errno){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// do not login yet, need to make user to login before use
				else if(10 === res.errno){
					alert('u need to login first' + res.data);
					_this.doLogin();
				}
				// 请求数据错误
				else if(1 === res.errno){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},	
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	// 统一登录处理
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	// 返回首页
	goHome : function(){
		window.location.href = './index.html';
	},
	// 获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);

		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模板, 把传入的模板和数据进行拼接
	renderHtml : function(htmlTemplate, data){
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data);
 
		return result;
	},
	// 成功提示
	successTips : function(msg){
		alert(msg || 'Success');
	},
	// 失败提示
	errorTips : function(msg){
		alert(msg || 'Error');
	},
	// 字段的验证，支持非空，手机，邮箱格式
	validate : function(value, type){
		// $.trim() 的作用：如果用户输入很多无意义的空格，会去掉空格，不会被认为是有意义的字符串；其次，如果用户输入的value是其他类型不是字符串，trim会将其转换为字符串
		var value = $.trim(value);
		// 非空验证
		if('require' == type){
			// 将字符串强转成布尔型
			return !!value;
		}
		// 电话格式验证
		else if('phone' == type){
			return /^\d{8}$/.test(value); 
		}
		// 邮箱格式验证
		else if('email' == type){
			return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
		}
	},
	// 顯示隱藏表格
	showBox : function(idname, id){
		idname += id;
		idname = '#' + idname;

		//alert(idname);

		// alert($(idname + ' .showbox').css('display'));

		if($(idname + ' .showbox').css('display') == 'block'){
			$(idname + ' .showbox').css('display', 'none');
			// alert($(idname + ' .showbox').css('display'));
		}else{
			$(idname + ' .showbox').css('display', 'block');
			// alert($(idname + ' .showbox').css('display'));
		}
	},
	// 
	validateForm : function(){

	},
	// 顯示頁面正中央的彈出窗口
	showPopUpLayer : function(){
		var _this = this;
		var viewWidth = document.documentElement.clientWidth;
		var viewHeight = document.documentElement.clientHeight;
		var scrollHeight = document.documentElement.scrollHeight;

		var layerMask = $("<div class='layer-mask'></div>");
		layerMask.css('width', viewWidth + 'px');
		layerMask.css('height', scrollHeight + 'px');
		layerMask.appendTo($('body'));
		var popupLayer = $("<div class='popup-layer'></div>");

		popupLayer.appendTo($('body'));

		layerMask.click(function(){
			_this.removeLayer();
		});
	},
	// set pop-up layer position
	setPopupLayerPosition : function(content){
		var scrollHeight = document.documentElement.scrollHeight;
		var viewWidth = document.documentElement.clientWidth;
		var viewHeight = document.documentElement.clientHeight;
		var contentWidth = content.width();
		var contentHeight = content.height();

		var popupLayer = $('.popup-layer');
		popupLayer.css('top', (viewHeight-contentHeight)/4 + 50 + 'px');
		popupLayer.css('left', (viewWidth - contentWidth)/2 + 'px');
	},
	// 固定selectorname的元素 設置position為fixed
	fixElement : function(selectorname){
		var layerBottom = $(selectorname);
		var offset = layerBottom.offset();
		var width = layerBottom.css('width');
		var top = offset.top - $(window).scrollTop();
		// alert('top pos: ' + width);
		layerBottom.css('bottom', '');
		layerBottom.css('right', '');
		layerBottom.css('position', 'fixed');
		layerBottom.css('top', top + 'px');
		layerBottom.css('left', offset.left + 'px');
		layerBottom.css('width', width );
	},
	// 移除彈出窗口
	removeLayer : function(){
		$('.layer-mask').remove();
		$('.popup-layer').remove();
	},
	// 顯示彈出框
	showServerRes : function(msg){
		var resBox = $("<div class='resBox' ></div>").appendTo($('body'));
		resBox.text(msg);
		this.showResBox();

		setTimeout(this.removeResBox, 3000);
	},
	// 彈出框出現
	showResBox : function(){
		var _this = this;
		var right = $('.resBox').css('right');
		right = parseInt(right);

		if(right < 20){
			right += 80;
			$('.resBox').css('right', right + 'px');
			setTimeout(_common.showResBox, 10);
			// alert('if function exist? - ' + $.isFunction(_common.showResBox));
		}else{
			$('.resBox').css('right', right + 'px');
		}
	},
	// 彈出框消失
	removeResBox : function(){
		var width = $('.resBox').css('width');
		var right = $('.resBox').css('right');
		width = (0 - 80 - parseInt(width));
		right = parseInt(right);

		if(right > width){
			right -= 30;
			// alert('remove res box : ' + right);
			$('.resBox').css('right', right + 'px');
			setTimeout(_common.removeResBox, 10);
		}else{
			$('.resBox').remove();
		}
	},
	// 
	showImgPost : function(photo_addr){
		var _this = this;
		photo_addr = photo_addr.replace('350/', '800/');
		var photoCon = $("<div class='photo-con'></div>");
		var photoImg = $("<img src='" + photo_addr + "' />");
		var userImg = $("<img src='" + $('#user-sicon img').attr('src') + "' />");
		// alert(userImg.attr('src'));
		// alert('safe till 244');													//!!!!!!!!!!!!!!!!!!!!!!!!!!?????????????????????
		// var photo_50_addr = photo_addr.replace("image", "image/50");
		var username = 'jojo';													/////////////////////////////////////////////////
		var postDate = 'sss';													/////////////////////////////////////////////////
		var postCaption = 'sssdddfff';											/////////////////////////////////////////////////
		// photo
		var photo = $("<div class='photo'><span class='img-helper'></span><img src='" + photo_addr + "' alt = '" + $('#user-sicon img').attr('alt') + "'/></div>");
		photo.appendTo(photoCon);
		// alert('safe till 252');													//!!!!!!!!!!!!!!!!!!!!!!!!!!?????????????????????

		// photo User Info
		var photoInfo = $("<div class='photo-info'></div>");
		var infoUser = $("<div class='info-user'></div>");
		var infoDetails = $("<div class='info-details'></div>");
		var infoUsername = $("<div class='info-username'><a href='#'>" + username + "</a></div>");
		var infoDate = $("<div class='info-date'>" + postDate + "</div>");
		var infoClose = $("<div class='info-close'><i class='fa fa-times'></i></div>");					/////////////////////////////////////////////////
		// photo_50_addr.appendTo(infoUser);
		// photoImg.appendTo(infoUser);											/////////////////////////////////////////////////
		userImg.appendTo(infoUser);												/////////////////////////////////////////////////
		infoUsername.appendTo(infoDetails);
		infoDate.appendTo(infoDetails);
		infoDetails.appendTo(infoUser);
		infoClose.appendTo(infoUser);
		infoUser.appendTo(photoInfo);
		photoInfo.appendTo(photoCon);

		// photo caption
		var photoCaption = $("<div class='photo-caption'>" + postCaption + "</div>");
		photoCaption.appendTo(photoCon);
		// alert('safe till 273');													//!!!!!!!!!!!!!!!!!!!!!!!!!!?????????????????????

		// responsive-like-comment-icon
		this.responsiveLikeCommentIcon(photoCon);

		// post-comment
		var postComment = $("<div class='post-comment'></div>");
		postComment.appendTo(photoCon);

		// comment-submit
		// commentSubmit(photoCon, photo_50_addr);
		// this.commentSubmitHtml(photoCon, photo_addr);								/////////////////////////////////////////////////
		this.commentSubmitHtml(photoCon, 0);											/////////////////////////////////////////////////

		photoCon.appendTo($('.popup-layer'));
		this.setImgPostCss();
		infoClose.click(function(){
			_this.removeLayer();
		});
		// alert('safe till 292');													//!!!!!!!!!!!!!!!!!!!!!!!!!!?????????????????????
	},
	// set css of photo-con
	setImgPostCss : function(){
		var viewWidth = document.documentElement.clientWidth;
		var viewHeight = document.documentElement.clientHeight;

		var conWidth = viewWidth*4/5;
		$('.photo-con').css('width', conWidth);
		conWidth = $('.photo-con').width();
		var conHeight = conWidth*35/60;
		$('.photo-con').css('height', conHeight);
		conHeight = $('.photo-con').height();
		$('.photo').css('width', conHeight);
		// 
		$('.photo img').load(function(){
			// alert($('.photo img').css('width'));
			// alert($('.photo img').css('height'));
			if($('.photo img').width() > $('.photo img').height()){
				$('.photo img').css('width', conHeight);
			}else{
				$('.photo img').css('height', conHeight);
			}
		});
		// 

		var infoWidth = conWidth - conHeight - 23;
		$('.photo-info').css('width', infoWidth);

		$('.info-user img').css('width', infoWidth/8);
		$('.info-details').css('width', infoWidth*6/9);
		$('.info-details').css('height', infoWidth/8);
		$('.info-username').css('line-height', infoWidth/13 + 'px');

		$('.responsive-like-comment-icon').css('width', infoWidth);
		$('.photo-caption').css('width', (infoWidth - 15));
		$('.photo-caption-space').css('width', infoWidth);
		$('.post-comment').css('width', infoWidth);
		this.setCommentSubmitHtmlCss($('.photo-con'), infoWidth);
		// $('.comment-submit').css('width', infoWidth);
		// // $('.comment-submit img').css('width', infoWidth/8);
		// buttonWidth = $('.comment-submit button').width();
		// $('.comment-submit input').css('width', infoWidth - 42 - 50 - buttonWidth);
		// $('.comment-submit button').css('width', infoWidth/8);

		// photo-info, photo-caption, photo-caption-space, comment-submit
		// 1st 50 is for margin-bottom of photo-caption, 2nd 50 is for height of borderssss
		commentHeight = conHeight - $('.photo-info').height() - $('.photo-caption').height()
								- 50 - $('.responsive-like-comment-icon').height() - $('.comment-submit').height() -20;
		$('.post-comment').css('max-height', commentHeight);
		// $('.post-comment').css('height', 100);
		this.setPopupLayerPosition($('.photo-con'));
	},
	// 
	editImgInfo : function(photo_addr){
		var _this = this;
		photo_addr = photo_addr.replace('350/', '800/');
		var photoCon = $("<div class='photo-con'></div>");
		var photoImg = $("<img src='" + photo_addr + "' />");
		var userImg = $("<img src='" + $('#user-sicon img').attr('src') + "' />");
		// var photo_50_addr = photo_addr.replace("image", "image/50");
		var username = 'jojo';													/////////////////////////////////////////////////
		var postDate = 'sss';													/////////////////////////////////////////////////
		var postCaption = 'sssdddfff';											/////////////////////////////////////////////////
		// photo
		var photo = $("<div class='photo'><span class='img-helper'></span><div class='img-box'><img class='img1' src='" + photo_addr + "' /><img class='img2' src='" + photo_addr + "' /></div></div>");
		photo.appendTo(photoCon);

		// photo User Info
		var photoInfo = $("<div class='photo-info'></div>");
		var infoUser = $("<div class='info-user'></div>");
		var infoDetails = $("<div class='info-details'></div>");
		var infoUsername = $("<div class='info-username'><a href='#'>" + username + "</a></div>");
		var infoDate = $("<div class='info-date'>" + postDate + "</div>");
		var infoClose = $("<div class='info-close'>X</div>");					/////////////////////////////////////////////////
		// photo_50_addr.appendTo(infoUser);
		// photoImg.appendTo(infoUser);											/////////////////////////////////////////////////
		userImg.appendTo(infoUser);												/////////////////////////////////////////////////
		infoUsername.appendTo(infoDetails);
		infoDate.appendTo(infoDetails);
		infoDetails.appendTo(infoUser);
		infoClose.appendTo(infoUser);
		infoUser.appendTo(photoInfo);
		photoInfo.appendTo(photoCon);

		// photo caption
		var photoCaption = $("<div class='photo-caption caption-editable'></div>");
		var imgDescript = $("<div id='editableDiv' onclick=\"document.getElementById('editableDiv').focus()\" contenteditable='true' data-text='What do you want to say about this photo? :D'></div>");
		imgDescript.appendTo(photoCaption);
		var imgLabel = $("<label onclick=\"document.getElementById('editableDiv').focus()\"></label>");
		imgLabel.appendTo(photoCaption);
		photoCaption.appendTo(photoCon);
		var photoFor = $("<div class='photo-for'>About : <span class='photo-for-content'></span></div>");
		photoFor.appendTo(photoCon);
		var imgInfoEditBtn = $("<div class='img-info-edit-button'><button class='post-btn'>Post</button><button class='cancel-btn'>Cancel</button></div>");
		imgInfoEditBtn.appendTo(photoCon);

		photoCon.appendTo($('.popup-layer'));
		_this.setEditImgInfoCss();

		infoClose.click(function(){
			_this.removeLayer();
		});
		imgInfoEditBtn.find('.cancel-btn').click(function(){
			_this.removeLayer();
		});
		imgInfoEditBtn.find('.post-btn').click(function(){
			_this.submitImgPostInfo();
		});

	},
	// set css of photo-con
	setEditImgInfoCss : function(){
		var viewWidth = document.documentElement.clientWidth;
		var viewHeight = document.documentElement.clientHeight;

		var conWidth = viewWidth*4/5;
		$('.photo-con').css('width', conWidth);
		conWidth = parseInt($('.photo-con').css('width'), 10);
		var conHeight = conWidth*35/60;
		$('.photo-con').css('height', conHeight);
		conHeight = parseInt($('.photo-con').css('height'), 10);
		$('.photo').css('width', conHeight);
		$('.photo img').load(function(){
			if($('.photo img').width() > $('.photo img').height()){
				$('.photo img').css('width', conHeight);
			}else{
				$('.photo img').css('height', conHeight);
			}
		});

		var infoWidth = conWidth - conHeight - 23;
		$('.photo-info').css('width', infoWidth);

		$('.info-user img').css('width', infoWidth/8);
		$('.info-details').css('width', infoWidth*6/9);
		$('.info-details').css('height', infoWidth/8);
		$('.info-username').css('line-height', infoWidth/13 + 'px');

		$('.photo-caption').css('width', (infoWidth - 15));
		$('.photo-for').css('width', (infoWidth - 15));
		$('.img-info-edit-button').css('width', (infoWidth - 15));



		// photo-info, photo-caption, photo-caption-space, comment-submit
		// 1st 50 is for margin-bottom of photo-caption, 2nd 50 is for height of borderssss
		commentHeight = conHeight - $('.photo-info').height() - $('.photo-caption').height()
								- 50 - $('.responsive-like-comment-icon').height() - $('.comment-submit').height() -30;
		$('.post-comment').css('height', commentHeight);
		this.setPopupLayerPosition($('.photo-con'));
	},
	// 
	loadComments : function(){

	},
	// 
	commentSubmitHtml : function(holder, prid){
		holder.find('> .comment-submit').remove();
		var photo_addr = $("#user-sicon img").attr('src');
		var commentSubmit = $("<div class='comment-submit'><img src='" + photo_addr + "' /><input type='text' name='" + prid + "' placeholder='write sth here...' value=''><button>Send</button></div>");
		commentSubmit.appendTo(holder);

	},
	// 
	setCommentSubmitHtmlCss : function(holder, htmlWidth){
		var commentSubmit = holder.find('.comment-submit');
		commentSubmit.css('width', htmlWidth);
		// $('.comment-submit img').css('width', infoWidth/8);
		buttonWidth = commentSubmit.find('button').width();
		commentSubmit.find('input').css('width', htmlWidth - 42 - 40 - buttonWidth);
	},
	// 
	responsiveLikeCommentIcon : function(holder){
		var responsiveLikeCommentIcon = $("<div class='responsive-like-comment-icon'><div class='responsive-icon rlike'><a href='#'>Like</a></div><div class='responsive-icon rcomment'><a href='#'>Comment</a></div></div>");
		responsiveLikeCommentIcon.appendTo(holder);
	},
	commentResponse : function(responseTime){

	},
	// 
	submitImgPostInfo : function(){
		var _this = this;

		var editableDiv = $('#editableDiv');
		var photo = $('.img-box .img1');
		var movableSq = $('#movable-sq');

		var arr = photo.attr('src').split('/');
		var imagename = arr[arr.length - 1];
		var data = {};
		data['imagename'] = imagename;
		data['imageWidth'] = photo.width();
		data['imageHeight'] = photo.height();
		data['sq-width'] = movableSq.width();
		data['sq-top'] = movableSq.position().top;
		data['sq-left'] = movableSq.position().left;
		data['imgInfo'] = editableDiv.html();


		this.requestCORS({
			url : "http://localhost/PHP_Project_One/manage/doFile.php?act=cropImg",				//  CONNECT TO PHP HERE !!! USING CORS... NOTICE
			data : data,
			// if method is post, then php cannot get the act param
			method : "post",
  			success : function(data, msg){
  				_this.removeLayer();
  			},
  			error : function(statusText){
  				alert("发生错误"+data.msg);
  			}
		});
		
	},
	// 
	cropImg : function(){
		document.onselectstart=new Function('event.returnValue=false;');

		var _this = this;

		var photo = $('.photo');

		var movableSq = $("<div class='movable-sq' id='movable-sq'></div>");
		$("<div id='left-up' class='minDiv left-up'></div>").appendTo(movableSq);
		// $("<div id='left' class='minDiv left'></div>").appendTo(movableSq);
		$("<div id='left-down' class='minDiv left-down'></div>").appendTo(movableSq);
		// $("<div id='up' class='minDiv top'></div>").appendTo(movableSq);
		$("<div id='right-up' class='minDiv right-up'></div>").appendTo(movableSq);
		// $("<div id='right' class='minDiv right'></div>").appendTo(movableSq);
		$("<div id='right-down' class='minDiv right-down'></div>").appendTo(movableSq);
		// $("<div id='down' class='minDiv bottom'></div>").appendTo(movableSq);
		movableSq.appendTo(photo.find('.img-box'));

		// alert('top : ' + photo.find('#left').offset().left);

		$('.photo .img1').css('opacity', 0.5);

		var boxDiv = $('.img-box');
		var mainDiv = $('.movable-sq');
		var leftupDiv = $('#left-up');
		// var upDiv = $('#up');
		var rightupDiv = $('#right-up');
		// var rightDiv = $('#right');
		var rightdownDiv = $('#right-down');
		// var downDiv = $('#down');
		var leftdownDiv = $('#left-down');
		// var leftDiv = $('#left');

		// 判断鼠标是否落下
		var ifBool = false;
		// 当前拖动的触点
		var contact = '';

		// ??? make movable-sq become draggable, a kind of jquery ui
		$('#movable-sq').draggable({
			containment : 'parent',
			drag : _this.setChoice
			// drag : setChoice
		});

		leftupDiv.mousedown(function(e){
			e.stopPropagation();
			ifBool = true;
			contact = "leftUp";

		});
		//鼠标按下-左中间
		// leftDiv.mousedown(function(e){
		// 	e.stopPropagation();
		// 	ifBool = true;
		// 	contact = "left";

		// });
		//鼠标按下-左下角
		leftdownDiv.mousedown(function(e){
			e.stopPropagation();
			ifBool = true;
			contact = "leftDown";

		});
		//鼠标按下-上边
		// upDiv.mousedown(function(e){
		// 	e.stopPropagation();
		// 	ifBool = true;
		// 	contact = "up";

		// });
		//鼠标按下-下边
		// downDiv.mousedown(function(e){
		// 	e.stopPropagation();
		// 	ifBool = true;
		// 	contact = "down";
			
		// });
		//鼠标按下-右上角
		rightupDiv.mousedown(function(e){
			e.stopPropagation();
			ifBool = true;
			contact = "rightUp";

		});
		//鼠标按下-右中间
		// rightDiv.mousedown(function(e){
		// 	e.stopPropagation();
		// 	ifBool = true;
		// 	contact = "right";

		// });
		//鼠标按下-右下角
		rightdownDiv.mousedown(function(e){
			e.stopPropagation();
			ifBool = true;
			contact = "rightDown";

		});

		$(document).mousemove(function(e){
			e.stopPropagation();

			if(ifBool){
				// alert(contact);
				switch(contact){
					case "leftUp":_this.leftupMove(e);break;
					// case "left":_this.leftMove(e);break;
					case "leftDown":_this.leftdownMove(e);break;
					// case "up":_this.upMove(e);break;
					// case "down":_this.downMove(e);break;
					case "rightUp":_this.rightupMove(e);break;
					// case "right":_this.rightMove(e);break;
					case "rightDown":_this.rightdownMove(e);break;
					default:alert("操作错误！");
				}
			var width = mainDiv.offsetWidth;
			var height = mainDiv.offsetHeight;
			_this.setChoice();
			}
		});
		//鼠标松开
		$(document).mouseup(function(e){
			ifBool = false;
			contact = "";
			// for auto-correcting 
			var mainDiv = $('.movable-sq');
			if(mainDiv.width() != mainDiv.height()){
				mainDiv.css('width', mainDiv.height());
				_this.setChoice();
			}
			
		});
		_this.setChoice();//初始化选择区域可见

	},
	//左边拖动
	// leftMove : function(e){
	leftupMove : function(e){
		var _this = this;
		var boxDiv = $('.img-box');
		var mainDiv = $('.movable-sq');
		var leftupDiv = $('.left-up');
		
		var x = e.clientX;//鼠标横坐标
		if(x < _this.getPosition(boxDiv).left){
			x = _this.getPosition(boxDiv).left;
		}
		var width = mainDiv.width() - 2;//选择层宽度
		var mainX = _this.getPosition(leftupDiv).left + 4;//左上角横坐标
		var addWidth = mainX - x;//拖动后应该增加的宽度

		//
		var y = e.clientY;//鼠标纵坐标
		if(y < _this.getPosition(boxDiv).top){
			y = _this.getPosition(boxDiv).top;
		}
		var height = mainDiv.height() - 2;//选择层的高度
		var mainY = _this.getPosition(leftupDiv).top + 4;//左上角纵坐标
		var addHeight = mainY - y;//拖动后应该增加的高度

		if(addWidth > addHeight){
			var addLength = addWidth;
		}else{
			var addLength = addHeight;
		}

		//设置拖动后的宽高和位置
		mainDiv.css('width', (width + addLength + 2));
		mainDiv.css('height', (height + addLength + 2) );
		mainDiv.css('left', (mainDiv.position().left - addLength));
		mainDiv.css('top', (mainDiv.position().top - addLength) );
		// mainDiv.css('height', (width + addWidth));

		// mainDiv.css('left', (mainDiv.position().left - addWidth));
		// mainDiv.css('top', mainDiv.offsetTop - mainX + x);
	},
	//上边拖动
	// upMove : function(e){
	rightupMove : function(e){
		var _this = this;
		var boxDiv = $('.img-box');
		var mainDiv = $('.movable-sq');
		var leftupDiv = $('.left-up');
		
		var y = e.clientY;//鼠标纵坐标
		if(y < _this.getPosition(boxDiv).top){
			y = _this.getPosition(boxDiv).top;
		}
		var height = mainDiv.height() - 2;//选择层的高度
		var mainY = _this.getPosition(leftupDiv).top + 4;//左上角纵坐标
		var addHeight = mainY - y;//拖动后应该增加的高度

		var x = e.clientX;//鼠标横坐标
		if(x > _this.getPosition(boxDiv).left + boxDiv.width()){
			x = _this.getPosition(boxDiv).left + boxDiv.width();
		}
		var width = mainDiv.width() - 2;//选择层宽度
		var mainX = _this.getPosition(leftupDiv).left + 4;//左上角横坐标
		var addWidth = x - width - mainX;//拖动后应该增加的宽度

		if(addWidth > addHeight){
			var addLength = addWidth;
		}else{
			var addLength = addHeight;
		}

		//设置拖动后的宽高和位置
		mainDiv.css('height', (height + addLength + 2) );
		mainDiv.css('width', (height + addLength) );

		mainDiv.css('top', (mainDiv.position().top - addLength) ); //纵坐标减去增加的高度
		
		//设置拖动后的宽高和位置
		// mainDiv.css('width', (height + addHeight) );
		// mainDiv.css('height', (height + addHeight) );


		// mainDiv.css('top', (mainDiv.position().top - addHeight) ); //纵坐标减去增加的高度
	},
	//下边拖动
	// downMove : function(e){
	leftdownMove : function(e){
		var _this = this;
		var boxDiv = $('.img-box');
		var mainDiv = $('.movable-sq');
		var leftupDiv = $('.left-up');
		var y = e.clientY;//鼠标纵坐标
		if(y > _this.getPosition(boxDiv).top + boxDiv.height()){
			y = _this.getPosition(boxDiv).top + boxDiv.height();
		}
		var height = mainDiv.height() - 2;//选择层的高度
		var mainY = _this.getPosition(leftupDiv).top + 4;//左上角纵坐标
		var addHeight = y - mainY - height;//拖动后应该增加的高度

		//
		var x = e.clientX;//鼠标横坐标
		if(x < _this.getPosition(boxDiv).left){
			x = _this.getPosition(boxDiv).left;
		}
		var width = mainDiv.width() - 2;//选择层宽度
		var mainX = _this.getPosition(leftupDiv).left + 4;//左上角横坐标
		var addWidth = mainX - x;//拖动后应该增加的宽度

		if(addWidth > addHeight){
			var addLength = addWidth;
			// mainDiv.css('border', '1px solid red');
		}else{
			var addLength = addHeight;
			// mainDiv.css('border', '1px solid blue');
		}

		mainDiv.css('width', (width + addLength ));
		mainDiv.css('height', (height + addLength));

		mainDiv.css('left', (mainDiv.position().left - addLength + 2));

		// mainDiv.css('width', (height + addHeight));
		// mainDiv.css('height', (height + addHeight));

		// mainDiv.css('left', mainDiv.width() - addHeight);
	},
	//右边拖动
	// rightMove : function(e){
	rightdownMove : function(e){
		var _this = this;
		var boxDiv = $('.img-box');
		var mainDiv = $('.movable-sq');
		var leftupDiv = $('.left-up');
		
		var x = e.clientX;//鼠标横坐标
		if(x > _this.getPosition(boxDiv).left + boxDiv.width()){
			x = _this.getPosition(boxDiv).left + boxDiv.width();
		}
		var width = mainDiv.width() - 2;//选择层宽度
		var mainX = _this.getPosition(leftupDiv).left + 4;//左上角横坐标
		var addWidth = x - width - mainX;//拖动后应该增加的宽度

		//
		var y = e.clientY;//鼠标纵坐标
		if(y > _this.getPosition(boxDiv).top + boxDiv.height()){
			y = _this.getPosition(boxDiv).top + boxDiv.height();
		}
		var height = mainDiv.height() - 2;//选择层的高度
		var mainY = _this.getPosition(leftupDiv).top + 4;//左上角纵坐标
		var addHeight = y - mainY - height;//拖动后应该增加的高度

		//设置拖动后的宽高和位置
		if(addWidth > addHeight){
			var addLength = addWidth;
		}else{
			var addLength = addHeight;
		}
		mainDiv.css('width', (width + addLength));
		mainDiv.css('height', (width + addLength));

		// // 设置拖动后的宽高和位置
		// mainDiv.css('width', (width + addWidth));
		// mainDiv.css('height', (width + addWidth));
	},
	//设置选择区域可见
	setChoice : function(){
		var boxDiv = $('.img-box');
		var mainDiv = $('.movable-sq');
		var leftupDiv = $('.left-up');

		// var offset = mainDiv.offset();
		// var top = offset.top;
		// var right = offset.left + mainDiv.width();
		// var bottom = offset.top + mainDiv.height();
		// var left = offset.left;
		var position = mainDiv.position();
		var top = position.top;
		var right = position.left + mainDiv.width();
		var bottom = position.top + mainDiv.height();
		var left = position.left;
		$(".photo .img2").css('clip', "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)");
		// preview({"top":top,"right":right,"bottom":bottom,"left":left});

	},
	//获取元素的绝对位置
	getPosition : function(node){
		var offset = node.offset();
		var left = offset.left;
		var top = offset.top;
	
		return {"left":left,"top":top};
	},
	// 
	editForm : function(holder){
		holder.find('.editable-input').each(function(){
			var spanVal = $(this).find('span').html();
			$(this).html($("<input type='text' value='" + spanVal + "' data-origin-formval='" + spanVal + "' />"));
		});
		holder.find('.editable-textarea').each(function(){
			var spanVal = $(this).find('span').html();
			$(this).html($("<textarea data-origin-formval='" + spanVal + "' >" + spanVal + "</textarea>"));
		});

		holder.find('.editbutton').hide();
		holder.find('.delbutton').hide();
		holder.find('.finishbutton').show();
		holder.find('.cancelbutton').show();
	},
	// 
	cancelEditForm(holder){
		holder.find('.editable-input').each(function(){
			var inputVal = $(this).find('input').attr('data-origin-formval');
			$(this).html($("<span>" + inputVal + "</span>"));
		});
		holder.find('.editable-textarea').each(function(){
			var textareaVal = $(this).find('textarea').attr('data-origin-formval');
			$(this).html($("<span>" + textareaVal + "</span>"));
		});

		holder.find('.editbutton').show();
		holder.find('.delbutton').show();
		holder.find('.finishbutton').hide();
		holder.find('.cancelbutton').hide();
	},
	// 
	finishEditForm(holder){
		holder.find('.editable-input').each(function(){
			var inputVal = $(this).find('input').val();
			$(this).html($("<span>" + inputVal + "</span>"));
		});
		holder.find('.editable-textarea').each(function(){
			var textareaVal = $(this).find('textarea').val();
			$(this).html($("<span>" + textareaVal + "</span>"));
		});

		holder.find('.editbutton').show();
		holder.find('.delbutton').show();
		holder.find('.finishbutton').hide();
		holder.find('.cancelbutton').hide();
	},
	// 開發調試用 顯示object 內的 data
	dumpObj : function(obj){
		var out = '';
	    for (var i in obj) {
	        out += i + ": " + obj[i] + "\n";
	    }

	    alert(out);
	}

};

module.exports = _common;