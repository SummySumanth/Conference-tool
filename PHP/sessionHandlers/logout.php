<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 5/16/2017
 * Time: 8:24 AM
 */
header('Content-type: application/json');
session_start();

if(isset($_SESSION['Email'])){

    session_destroy();
    if(!isset($_SESSION['Email'])){
        $response['status'] = 'success';
        $response['message'] = 'successfully loggedout';
        echo json_encode($response);
    }else{
        $response['status'] = 'success';
        $response['message'] = 'successfully loggedout';
        echo json_encode($response);
    }

}else{
    $response['status'] = 'error';
    $response['message'] = 'No session was created';
    echo json_encode($response);
}