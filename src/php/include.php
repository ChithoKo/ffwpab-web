<?php

/**
 * @Author: CharlesKo
 * @Date:   2017-10-16 23:36:54
 * @Last Modified by:   CharlesKo
 * @Last Modified time: 2017-10-16 23:37:06
 */


header("content-type:text/html charset=utf8");
date_default_timezone_set('Asia/Hong_Kong');
session_start();

define('ROOT', dirname(__FILE__), TRUE);

//echo ROOT."<br/>";
set_include_path('.'.PATH_SEPARATOR.ROOT.PATH_SEPARATOR.ROOT.'/lib'.PATH_SEPARATOR.ROOT.'/logic'.PATH_SEPARATOR.get_include_path());

require_once "mysql.func.php";
require_once "common.func.php";

require_once "admin.inc.php";
require_once "member.inc.php";
require_once "duty.inc.php";
require_once "attendant.inc.php";
require_once "meeting.inc.php";
require_once "image.inc.php";

