<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 5/12/2017
 * Time: 12:09 PM
 */



header('Content-type: application/json');
include('../../Connection.php');

if($_POST) {
    $obj = $_POST['userDetails'];

    $userID = mysql_real_escape_string($obj['userID']);

}
$sql_query = "SELECT * FROM `Users` WHERE `PUID` = '" . $userID . "'";

$result = mysqli_query($db_conn, $sql_query);

//echo $sql_query;
if (mysqli_num_rows($result) == 1) {
    while($row = mysqli_fetch_assoc($result)) {
        $myArray[] = $row;
    }
    $response["status"]="success";
    $response["message"]="Successfully retrieved row";
    $response["DATA"]=$myArray;
    echo json_encode($response);
} else {
    $response["status"]="error";
    $response["message"]="unable to retrive data";
    $response["DATA"]="NO DATA";
    echo json_encode($response);
}

