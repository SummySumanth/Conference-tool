<?php

	include('connection.php');

	if($_POST);
	{
		$FirstName = mysql_real_escape_string($_POST['fname']);
		$SecondName = mysql_real_escape_string($_POST['sname']);
		$Email = mysql_real_escape_string($_POST['email']);
		$Phone = mysql_real_escape_string($_POST['phone']);
		$Institute = mysql_real_escape_string($_POST['institute']);
		$City = mysql_real_escape_string($_POST['city']);
		$State = mysql_real_escape_string($_POST['state']);
		$Country = mysql_real_escape_string($_POST['country']);
		$PassKey  = mysql_real_escape_string($_POST['passKey']);
		$GKey = mysql_real_escape_string($_POST['googleKey']);
		$FKey = mysql_real_escape_string($_POST['facebookKey']);


		$stmt = $db_con->prepare("SELECT * FROM participants WHERE user_email=:email");
		$stmt->execute(array(':email'=>$user_email));
		$count = $stmt->rowCount();


		if($count == 0){
			$stmt = $db_con->("INSERT INTO tbl_users(user_name,user_email,user_password,joining_date) VALUES(:uname, :email, :pass, :jdate)");
            $stmt->bindParam(":uname",$user_name);
		}




	}
?>