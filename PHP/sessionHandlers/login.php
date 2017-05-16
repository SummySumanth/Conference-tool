<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 5/13/2017
 * Time: 12:29 AM
 */

header('Content-type: application/json');
include('../Connection.php');
include('sessionCreator.php');

if($_POST) {
    $obj = $_POST['loginDetails'];
    $emailAddress = mysql_real_escape_string($obj['userEmail']);
    $password = mysql_real_escape_string($obj['userPassword']);


    $sql_query = "SELECT * FROM `Users` WHERE `Email` = '" . $emailAddress . "' AND `PassKey` = '" . $password . "'";

    $result = mysqli_query($db_conn, $sql_query);

    if (mysqli_num_rows($result) == 1) {
        while ($row = mysqli_fetch_assoc($result)) {
            $myArray[] = $row;
        }
        $userDetails = $myArray[0];

        createSession($userDetails);
        $response["status"] = "success";
        $response["message"] = "User Found";
        $response["Privilage"] = $userDetails['Privilege'];
        echo json_encode($response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Email or Password did not match";
        $response["Privilage"] = "Null";
        echo json_encode($response);
    }
}