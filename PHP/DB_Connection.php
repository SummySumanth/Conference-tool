<?php

	$servername = "localhost";
		$username = "sumanth";
		$password = "password";

		// Create connection
		$conn = new mysqli($servername, $username, $password,"testdb");

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 
		echo "Connected successfully " . "<br><br><br>";
		//

		

		


?>