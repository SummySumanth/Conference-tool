<?php
include('../connection.php');

if($_POST) {
    $obj = $_POST['trackDetails'];

    $TrackName = mysql_real_escape_string($obj['TrackName']);
    $TrackDesc = mysql_real_escape_string($obj['TrackDesc']);
    $TrackAdderID = 'Admin ';                  //$_SESSION["userID"];
    $Timestamp = mysql_real_escape_string($obj['Timestamp']);

//    $sql = "SELECT * FROM `Tracks` WHERE TrackName='$TrackName'";
//    $result = mysqli_query($db_conn, $sql);

    $sql = "INSERT INTO Tracks(TrackName, TrackDesc, TrackAdderID, Timestamp) VALUES(
    '$TrackName', 
    '$TrackDesc',
    '$TrackAdderID',
    '$Timestamp' 
    )";
    header('Content-type: application/json');
    $response_array['status'] = 'status123';
    echo json_encode($response_array);
    $result = mysqli_query($db_conn, $sql);
    if($result){
        echo 'track already exists';
    }
}
