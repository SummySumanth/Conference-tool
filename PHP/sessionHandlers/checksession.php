<?php
/**
 * Created by PhpStorm.
 * User: Sumanth
 * Date: 5/13/2017
 * Time: 1:42 AM
 */
header('Content-type: application/json');
session_start();
//date_default_timezone_set('asia/kolkata');
//$t=time();
//echo($t . "<br>");
//echo(date("Y-m-d-h-m-s",$t));
//echo $_SESSION['Email'];
//echo "   ";
//echo $_SESSION['FirstName'];
//echo "   ";
//echo  $_SESSION['Privilege'];

if(isset($_SESSION['Email'])){
    $response['status']='success';
    $response['loggedIn']=true;
    $response['data']=$_SESSION['Email'];
    echo json_encode($response);
}else{
    $response['status']='success';
    $response['loggedIn']=false;
    $response['data']=$_SESSION['Email'];
    echo json_encode($response);
}