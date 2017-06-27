<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 5/11/2017
 * Time: 12:03 PM
 */

session_start();

if(isset($_SESSION['Email']) && $_SESSION['Privilege'] == 'Admin' ||  $_SESSION['Privilege'] == 'Evaluator' || $_SESSION['Privilege'] == 'Participant'){
    header('Content-type: application/json');
    include('../Connection.php');

    $user = $_SESSION['PUID'];
    $sql_query = "SELECT * FROM `Papers` WHERE PUID ='$user'";
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
        $response["sql"]=$sql_query;
        echo json_encode($response);
    } else {
        $response["status"]="error";
        $response["message"]="unable to retrive data";
        $response["row_count"]=$count;
        $response["DATA"]="NO DATA";
        $response["sql"]=$sql_query;
        echo json_encode($response);
    }
}else{
    $response['status'] = "error";
    $response['message'] = "Your account is no longer logged in, please log in again";
    $response['loginStatus'] = 'false';
    echo json_encode($response);
    exit();
}