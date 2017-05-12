<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 5/11/2017
 * Time: 12:03 PM
 */

header('Content-type: application/json');
include('../../Connection.php');

$sql_query = 'SELECT * FROM `tracks`';
$result = mysqli_query($db_conn, $sql_query);


if (mysqli_num_rows($result) > 0) {
    $count = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $count++;
        $myArray[] = $row;
    }
    $response["status"]="success";
    $response["message"]="Successfully retrieved all rows";
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

