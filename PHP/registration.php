<?php

include('connection.php');

if($_POST);
{	$obj = $_POST['myData'];
	echo $obj.first_name;
	// $FirstName = mysql_real_escape_string($_POST['fname']);
	// $SecondName = mysql_real_escape_string($_POST['sname']);
	// $Email = mysql_real_escape_string($_POST['email']);
	// $Phone = mysql_real_escape_string($_POST['phone']);
	// $Institute = mysql_real_escape_string($_POST['institute']);
	// $City = mysql_real_escape_string($_POST['city']);
	// $State = mysql_real_escape_string($_POST['state']);
	// $Country = mysql_real_escape_string($_POST['country']);
	// $PassKey  = mysql_real_escape_string($_POST['passKey']);
	// $GKey = mysql_real_escape_string($_POST['googleKey']);
	// $FKey = mysql_real_escape_string($_POST['facebookKey']);

	// try{
	// 		$stmt = $db_con->prepare("SELECT * FROM participants WHERE user_email=:email");
	// 		$stmt->execute(array(':email'=>$user_email));
	// 		$count = $stmt->rowCount();
	// 		if($count == 0){
	// 			$stmt = $db_con->("INSERT INTO tbl_users(FirstName, SecondName, Email, PhoneNumber, Institution, City, State, Country, PassKey, GoogleKey, FacebookKey) VALUES(:fname, :sname, :email, :pnumber, :institute, :city, :state, :country, :pkey, :gkey, :fkey)");
	// 			$stmt->bindParam(":fname",$FirstName);
	// 			$stmt->bindParam(":sname",$SecondName);
	// 			$stmt->bindParam(":email",$Email);
	// 			$stmt->bindParam(":pnumber",$Phone);
	// 			$stmt->bindParam(":institute",$institute);
	// 			$stmt->bindParam(":city",$City);
	// 			$stmt->bindParam(":state",$State);
	// 			$stmt->bindParam(":country",$Country);
	// 			$stmt->bindParam(":pkey",$PassKey);
	// 			$stmt->bindParam(":gkey",$GKey);
	// 			$stmt->bindParam(":fkey",$FKey);
	// 			if($stmt->execute()){
	// 				echo "registered";
	// 			}
	// 			else{
	// 				echo "Query could not execute !";
	// 			}
	// 		}
	// 		else{
	// 		    echo "1"; //  not available
	// 		}
	// }catch(PDOException $e){
	//    	echo $e->getMessage();
	// }
}
?>