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
    $obj = $_POST['trackDetails'];

    $TrackID = mysql_real_escape_string($obj['trackID']);

}
$sql_query = "SELECT * FROM `Tracks` WHERE `trackID` = '" . $TrackID . "'";

$result = mysqli_query($db_conn, $sql_query);

//echo $sql_query;
if (mysqli_num_rows($result) > 0) {
    $count = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $count++;
        $myArray[] = $row;
    }
    $response["status"]="success";
    $response["message"]="Successfully retrieved row";
    $response["row_count"]=$count;
    $response["DATA"]=$myArray;
    echo json_encode($response);
} else {
    $response["status"]="error";
    $response["message"]="unable to retrive data";
    $response["row_count"]=$count;
    $response["DATA"]="NO DATA";
    echo json_encode($response);
}

