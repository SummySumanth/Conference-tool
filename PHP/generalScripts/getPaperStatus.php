<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 6/25/2017
 * Time: 4:17 PM
 */

session_start();

if(isset($_SESSION['Email']) && $_SESSION['Privilege'] == 'Admin' || $_SESSION['Privilege'] == 'Evaluator' || $_SESSION['Privilege'] == 'Participant'){
    header('Content-type: application/json');
    include('../Connection.php');
    session_start();
    if(isset($_SESSION['Email']))  {
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
        $response["DATA"]=$myArray[0];
        $response["Query"]=$sql_query;
        echo json_encode($response);
    }else{
        $response['status'] = "error";
        $response['message'] = "Your account is no longer logged in, please log in again";
        $response['loginStatus'] = 'false';
        echo json_encode($response);
        exit();
    }
}else{
    $response['status'] = "error";
    $response['message'] = "Your account is no longer logged in, please log in again";
    $response['loginStatus'] = 'false';
    echo json_encode($response);
    exit();
}
