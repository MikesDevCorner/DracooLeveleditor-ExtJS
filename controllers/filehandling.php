<?php

	$mode = $_REQUEST["mode"];
	
	if($mode == "upload") {
		$levelstring = str_replace("@","\"",$_REQUEST["json"]);
		$levelpack = strtolower($_REQUEST["levelpack"]);
		$filename = $_REQUEST["filename"];
		
		$success = file_put_contents("../../draco9/assets/".$levelpack."/levels/".$filename, $levelstring);
		echo "{success:".($success!=false)."}";
	}
	
	if($mode == "load") {
		$levelpack = strtolower($_REQUEST["levelpack"]);
		$filename = $_REQUEST["filename"];
	
		$levelstring = file_get_contents("../../draco9/assets/".$levelpack."/levels/".$filename);
		//$levelstring = str_replace("\r\n","\\r\\n",$levelstring);
		echo $levelstring;
	}


?>