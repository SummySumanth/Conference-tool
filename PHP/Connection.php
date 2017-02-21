<?php
	$servername = "localhost";
		$username = "sumanth";
		$password = "password";

		// Create connection
		$db_conn = new mysqli($servername, $username, $password,"testdb");
		// Check connection
		if ($db_conn->connect_error) {
		    die("Connection failed: " . $db_conn->connect_error);
		} 
		echo "Connected successfully " . "<br><br><br>";
		//
?>