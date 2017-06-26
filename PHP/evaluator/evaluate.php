<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 6/26/2017
 * Time: 11:37 AM
 */

session_start();
if(isset($_SESSION['Email']) && (($_SESSION['Privilege'] == 'Admin') || ($_SESSION['Privilege'] == 'Evaluator')))  {

    header('Content-type: application/json');
    include('../Connection.php');

    if ($_POST) {
        $obj = $_POST['evaluator'];
        $paperID =  $obj['paperID'];
        $Status = $obj['paperStatus'];
        $timestamp =  $obj['timestamp'];
        $evaluator = $_SESSION['PUID'];

        $sql = "SELECT * FROM `approvals` WHERE PaperID='$paperID'";
        $result = mysqli_query($db_conn, $sql);
        if (mysqli_affected_rows($db_conn) > 0) {
            $sql = "UPDATE `approvals` SET approverID='$evaluator',Status='$Status',timestamp='$timestamp' WHERE PaperID='$paperID'";

        } else {

        }


    }
}else{
    $response['status'] = "error";
    $response['message'] = "Your account is no longer logged in, please log in again";
    $response['loginStatus'] = 'false';
    echo json_encode($response);
    exit();
}
