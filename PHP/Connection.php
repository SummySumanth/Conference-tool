<?php
	$servername = "localhost";
    $username = "sumanth";
    $password = "password";

    global $db_conn;
    // Create connection
    $db_conn = new mysqli($servername, $username, $password,"CMT");
    // Check connection
    if ($db_conn->connect_error) {
        die("Connection failed: " . $db_conn->connect_error);
    }
//    [note: the following line has been commented in order to recieve json data properly in ajax call, DO NOT UN-COMMENT
//    echo "Connection to database established successfully [file: Connection.php]\n";

?>