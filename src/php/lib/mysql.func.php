<?php

/**
 * @Author: CharlesKo
 * @Date:   2017-10-16 23:34:16
 * @Last Modified by:   CharlesKo
 * @Last Modified time: 2017-10-16 23:34:46
 */

require_once './configs.php';
//require_once '../include.php';


//Connect to database 
function connect(){
	$conn = new mysqli(DB_HOST, DB_USER, DB_PWD, DB_DBNAME);


	if($conn->connect_error){
		$msg = die('Connection failed '.$conn->connect_error);
	}else{
		$msg = 'Connection success';
	}

	if(!$conn->set_charset('utf8')){
		$msg = die('Setting charset failed '.$conn->error);
	}else{
		$msg = 'current character set : '.$conn->character_set_name();
	}

	//echo 'connection msg : '.$msg.' <br/>';												/////

	return $conn;
}

//insert data ($array) into table in db $table
function insert($table, $array){
	$conn = connect();

	$keys = join(',', array_keys($array));
	$vals = join(',', array_values($array));
	$sql = "INSERT INTO $table($keys) VALUES($vals);";

	//echo "<br/>".$sql."<br/>";															/////

	if($conn->query($sql) === true) $msg = "<br/>Insert success <br/>";
	else $msg = "<br/>Insert failure ".$conn->error."<br/>";

	//echo $msg;																			/////

	$msg = $conn->insert_id;

	closeConn($conn);

	//echo $msg."<br/>";

	return $msg;
}


function insertMulti($table, $arrayMulti){
	$conn = connect();

	$keys = join(',', array_keys($arrayMulti[0]));
	$valString = '';
	$sep = '';
	foreach ($arrayMulti as $array) {
		$vals = null;
		$vals = join(',', array_values($array));
		$valString .= "$sep ($vals)";
		$sep = ',';
	}
	$sql = "INSERT INTO $table($keys) VALUES $valString;";

	// echo 'sql : inserting multi : ' . $sql . "\n";

	if($conn->query($sql) === true) $msg = "<br/>Insert success <br/>";
	else $msg = "<br/>Insert failure ".$conn->error."<br/>";

	closeConn($conn);

	return $msg;

}

//close connection to db
function closeConn($conn){
	$conn->close();
	return ;
}

//update data in $table with data $array
function update($table, $array, $where=null){
	$conn = connect();

	$str=null; 
	foreach($array as $key=>$val){
		if($str == null){
			$sep = '';
		}else{
			$sep = ', ';
		}
		$str .= ($sep.$key.'='.$val);
	}

	$sql = "UPDATE $table SET $str ".($where==null?null:"WHERE $where");

	// echo "\n  mysql : $sql  :  \n";													////////

	if($conn->query($sql) === true) $msg = "<br/>update success<br/>";
	else $msg = "<br/>update failure: ".$conn->error."<br/>";

	// echo "msg_mysql : $msg  :  \n";													///////////

	$msg = $conn->affected_rows;

	closeConn($conn);

	return $msg;
}

//delete data in $table
function delete($table, $where=null){
	$conn = connect();

	
	$sql = "DELETE FROM $table ".($where == null?null:" WHERE $where");
	echo $sql."<br/>";																//////////

	if($conn->query($sql) === true) $msg = "<br/>delete success<br/>";
	else $msg = "<br/>delete failure: ".$conn->error."<br/>";

	echo $msg."<br/>";																//////////

	$msg = $conn->affected_rows;

	closeConn($conn);

	return $msg;
}

//get data of one row from db
function fetchOne($sql, $result_type=MYSQLI_ASSOC){
	$conn = connect();

	$result = $conn->query($sql);
	$row = $result->fetch_array($result_type);

	closeConn($conn);

	return $row;
}

//get all data of a table in db
function fetchAll($sql, $result_type=MYSQLI_ASSOC){
	$conn = connect();
	$rows = array();

	$result = $conn->query($sql);
	while($row = $result->fetch_array($result_type)){
		$rows[] = $row;
	}

	closeConn($conn);

	return $rows;
}

//get the num of rows in a table of db
function getResultNum($sql){
	$conn = connect();

	$result = $conn->query($sql);
	$msg = $result->num_rows;

	closeConn($conn);
	return $msg;
}

// var_dump(fetchAll("SELECT * FROM stjohn_attendant WHERE did = 8 AND stateMem = 'approved' AND stateAdm = 'pending'"));


//var_dump(getResultNum('SELECT * FROM stjohn_admin'));
//define('ROOT', dirname(__FILE__));
//echo ROOT;
//echo "deleted rows: ".delete("stjohn_admin", "id = 2");

//$array = array("password"=>"'224'");
//echo update("stjohn_admin", $array, "username = 'tester02'");
//echo insert("stjohn_admin", $array);
?>