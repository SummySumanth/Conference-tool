<?php
header('Content-type: application/json');
include('connection.php');

if($_POST);
{	$obj = $_POST['myData'];

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

    $sql = "SELECT * FROM `participants` WHERE Email='$Email'";
    $result = mysqli_query($db_conn, $sql);

    if(mysqli_affected_rows($db_conn) > 0)
    {
        $response['status'] = "error";
        $response['message'] = "Email address already taken, if you have forgotten your password, please reset your password";
        echo json_encode($response);
        exit();
    } else{
        $sql ="INSERT INTO participants(FirstName, SecondName, Email, PhoneNumber, Institution, City, State, Country, PassKey, GoogleKey, FacebookKey) VALUES(
		'" . $FirstName . "' , 
		'" . $SecondName . "' ,
		'" . $Email . "' ,
		'" . $Phone . "' ,
		'" . $Institute . "' ,
		'" . $City . "' ,
		'" . $State . "' ,
		'" . $Country . "' ,
		'" . $PassKey . "' ,
		'" . $GKey . "' ,
		'" . $FKey . "' 
		)";
        $result = mysqli_query($db_conn,$sql);

        if (!$result) {
            printf("Error: %s\n", mysqli_error($db_conn));
            exit();
        }else{
            $response['status'] = "success";
            $response['message'] = "Registration Successful";
            echo json_encode($response);
            exit();
        }
    }
    }
?>