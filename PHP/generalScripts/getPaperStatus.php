<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 6/25/2017
 * Time: 4:17 PM
 */

header('Content-type: application/json');
include('../Connection.php');

if($_POST) {
    $obj = $_POST['paperDetails'];

    $PaperID = mysql_real_escape_string($obj['PaperID']);

}
$sql_query = "SELECT Status FROM `approvals` WHERE `PaperID` = '" . $PaperID . "'";

$result = mysqli_query($db_conn, $sql_query);

while($row = mysqli_fetch_assoc($result)) {
    $myArray[] = $row;
}

    $response["status"]="success";
    $response["message"]="Successfully retrieved row";
    $response["DATA"]=$myArray;
    echo json_encode($response);

//if (mysqli_num_rows($result) == 1) {
//    while($row = mysqli_fetch_assoc($result)) {
//        $myArray[] = $row;
//    }
//    $response["status"]="success";
//    $response["message"]="Successfully retrieved row";
//    $response["DATA"]=$myArray;
//    echo json_encode($response);
//} else {
//    $response["status"]="error";
//    $response["message"]="unable to retrive data";
//    $response["DATA"]="NO DATA";
//    $response["SQL"]=$sql_query;
//    echo json_encode($response);
//}