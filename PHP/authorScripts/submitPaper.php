<?php
header('Content-type: application/json');
include('../Connection.php');

session_start();

function storeFile($paperTitle)
{
    $file_ext = strtolower(end(explode('.', $_FILES['file']['name'])));
    if (!file_exists('../../uploadedFiles/' . $_SESSION['Email'] . '/Papers/')) {
        mkdir('../../uploadedFiles/' . $_SESSION['Email'] . '/Papers/', 0777, true);
    }
    $file_location = '../../uploadedFiles/' . $_SESSION['Email'] . '/Papers/' . $paperTitle . '.' . $file_ext;
    move_uploaded_file($_FILES['file']['tmp_name'], $file_location);

    return 'uploadedFiles/' . $_SESSION['Email'] . '/Papers/' . $paperTitle . '.' . $file_ext;
}

function registerPaper($paperDetails, $location, $db_connection)
{
    $PUID = $_SESSION['PUID'];
    $TrackID = $paperDetails['Track'];
    $Title = $paperDetails['Title'];
    $Description = $paperDetails['Description'];
    $CoPresenters = $paperDetails['CoPresenters'];
    $sql = "INSERT INTO `Papers` (PUID, trackID, Title, Description, Co_presenters, FileLocation) VALUES (
    '$PUID',
    '$TrackID',
    '$Title',
    '$Description',
    '$CoPresenters',
    '$location'
    );";

    $result = mysqli_query($db_connection, $sql);
    if (!$result) {
        $response['status'] = "error";
        $response['message'] = mysqli_error($db_connection);
        echo json_encode($response);
        exit();
    } else {
        $response['status'] = "success";
        $response['message'] = "Your paper has been successfully submitted, it will be reviewed shortly";
        echo json_encode($response);
        exit();
    }
}


if ($_POST) {
    if (0 < $_FILES['file']['error']) {
        $response['status'] = "error";
        $response['message'] = $_FILES['file']['error'];
        echo json_encode($response);
    } else {
        $paperDetails = json_decode($_POST['json'], true);
        $location = storeFile($paperDetails['Title']);
        registerPaper($paperDetails, $location, $db_conn);
    }
} else {
    $response['status'] = "error";
    $response['message'] = "did not receive any post data";
    echo $response;
}

