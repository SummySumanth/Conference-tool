<?php
session_start();

if(isset($_SESSION['Email']) && $_SESSION['Privilege'] == 'Admin'){
    header('Content-type: application/json');
    include('../../Connection.php');
    if ($_POST) {
        $obj = $_POST['trackDetails'];
        $TrackName = mysql_real_escape_string($obj['TrackName']);
        $TrackDesc = mysql_real_escape_string($obj['TrackDesc']);
        $TrackAdderID = $_SESSION['Email'];
        $Timestamp = mysql_real_escape_string($obj['Timestamp']);

        $sql = "SELECT * FROM `Tracks` WHERE TrackName='$TrackName'";
        $result = mysqli_query($db_conn, $sql);

        if (mysqli_affected_rows($db_conn) > 0) {
            $response['status'] = "error";
            $response['message'] = "The specified track already exists";
            echo json_encode($response);
            exit();
        } else {
            $sql = "INSERT INTO Tracks(TrackName, TrackDesc, TrackAdderID, Timestamp) VALUES(
            '$TrackName',
            '$TrackDesc',
            '$TrackAdderID',
            '$Timestamp'
        )";
            $result = mysqli_query($db_conn, $sql);

            if (!$result) {
                printf("Error: %s\n", mysqli_error($db_conn));
                exit();
            } else {
                $response['status'] = "success";
                $response['message'] = "The specified track has been added";
                echo json_encode($response);
                exit();
            }
        }
    }
}else{
    $response['status'] = "error";
    $response['message'] = "Your account is no longer logged in, please log in again";
    $response['loginStatus'] = 'false';
    echo json_encode($response);
    exit();
}
