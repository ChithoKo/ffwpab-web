<?php

/**
 * @Author: CharlesKo
 * @Date:   2017-10-16 23:35:30
 * @Last Modified by:   CharlesKo
 * @Last Modified time: 2017-10-16 23:35:51
 */

//
function alertMsg($msg, $url){
	echo "<script>alert('$msg');</script>";
	echo "<script>window.location = '$url'</script>";
}

function genWkDay($timestamp){
	 $arr = localtime(strtotime($timestamp), true);
	 $wday = $arr['tm_wday'];
	 switch ($wday) {
	 	case 0:
	 		$wday = '日';
	 		break;
	 	case 1:
	 		$wday = '一';
	 		break;
	 	case 2:
	 		$wday = '二';
	 		break;
	 	case 3:
	 		$wday = '三';
	 		break;
	 	case 4:
	 		$wday = '四';
	 		break;
	 	case 5:
	 		$wday = '五';
	 		break;
	 	default:
	 		$wday = '六';
	 		break;
	 }
	 return $wday;
}

function genDate($timestamp){
	return date('d/m/Y', strtotime($timestamp));
}

function genTime($timestamp){
	return date('H:i', strtotime($timestamp));
}

function genDateFromPage($date){
	$datearr = explode('/', $date);
	$date = $datearr[2] . '-' . $datearr['1'] . '-' . $datearr[0];

	return $date;
}