<?php

include('connection.php');

if($_POST);
{	$obj = $_POST['myData'];
	echo "Registration.php echos:";
	echo $obj['first_name'];
	echo "\n";
	echo $obj['second_name'];
	echo "\n";
	echo $obj['email_address'];
	echo "\n";
	echo $obj['phone_number'];
	echo "\n";
	echo $obj['institute'];
	echo "\n";
	echo $obj['city'];
	echo "\n";
	echo $obj['state'];
	echo "\n";
	echo $obj['country'];
	echo "\n";
	echo $obj['password'];
	echo "\n";

	$FirstName = mysql_real_escape_string($obj['first_name']);
	$SecondName = mysql_real_escape_string($obj['second_name']);
	$Email = mysql_real_escape_string($obj['email_address']);
	$Phone = mysql_real_escape_string($obj['phone_number']);
	$Institute = mysql_real_escape_string($obj['institute']);
	$City = mysql_real_escape_string($obj['city']);
	$State = mysql_real_escape_string($obj['state']);
	$Country = mysql_real_escape_string($obj['country']);
	$PassKey  = mysql_real_escape_string($obj['password']);
	$GKey = mysql_real_escape_string('0');
	$FKey = mysql_real_escape_string('0');


	$sql ="INSERT INTO participants VALUES('"
	. $FirstName 
	. $SecondName 
	. $Email 
	. $Phone 
	. $institute 
	. $City 
	. $State 
	. $Country 
	. $PassKey 
	. $GKey 
	. $FKey .
	"')";
	$result = mysqli_query($db_conn,$sql);

	if (!$result) {
		printf("Error: %s\n", mysqli_error($db_conn));
		exit();
	}

	// try{
	// 		$stmt = $db_con->prepare("SELECT * FROM participants WHERE user_email=:email");
	// 		$stmt->execute(array(':email'=>$user_email));
	// 		$count = $stmt->rowCount();
	// 		if($count == 0){
	// 			 $stmt = $db_con->prepare("INSERT INTO participants(user_name,user_email,user_password,joining_date) VALUES(:uname, :email, :pass, :jdate)");
 //            $stmt->bindParam(":uname",$FirstName);
 //            $stmt->bindParam(":email",$SecondName);
 //            $stmt->bindParam(":pass",$Email);
 //            $stmt->bindParam(":jdate",$institute);



	// 			// $stmt = $db_con->("INSERT INTO tbl_users(FirstName, SecondName, Email, PhoneNumber, Institution, City, State, Country, PassKey, GoogleKey, FacebookKey) VALUES(:fname, :sname, :email, :pnumber, :institute, :city, :state, :country, :pkey, :gkey, :fkey)");
	// 			// $stmt->bindParam(":fname",$FirstName);
	// 			// $stmt->bindParam(":sname",$SecondName);
	// 			// $stmt->bindParam(":email",$Email);
	// 			// $stmt->bindParam(":pnumber",$Phone);
	// 			// $stmt->bindParam(":institute",$institute);
	// 			// $stmt->bindParam(":city",$City);
	// 			// $stmt->bindParam(":state",$State);
	// 			// $stmt->bindParam(":country",$Country);
	// 			// $stmt->bindParam(":pkey",$PassKey);
	// 			// $stmt->bindParam(":gkey",$GKey);
	// 			// $stmt->bindParam(":fkey",$FKey);
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