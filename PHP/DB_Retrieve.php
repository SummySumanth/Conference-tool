<?php
	function read(){
		include('Connection.php');
		$sql ="SELECT * FROM testtable";
		$result = mysqli_query($conn,$sql);

		if (!$result) {
			printf("Error: %s\n", mysqli_error($conn));
			exit();
		}

		echo "<table border=10;'> <tr><th>Name</th></tr>";
		while($row=mysqli_fetch_array($result,MYSQLI_BOTH)){
			echo "<tr><td>" . $row['name'] . "</td></tr>" ;
		}
		echo "</table><br><br><br>";

	}
	read();

?>