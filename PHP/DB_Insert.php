<?php
	$name = $_POST['name'];
	echo $name;

	include('Connection.php');
	$sql ="INSERT INTO testtable VALUES('". $name ."')";
	$result = mysqli_query($conn,$sql);

	if (!$result) {
		printf("Error: %s\n", mysqli_error($conn));
		exit();
	}

	
	include('Retrieve.php');

	include('index.html');
?>