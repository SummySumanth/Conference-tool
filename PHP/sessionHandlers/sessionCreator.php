<?php

function createSession($userDetails){
    session_start();
    $_SESSION['Email']=$userDetails['Email'];
    $_SESSION['PUID']=$userDetails['PUID'];
    $_SESSION['FirstName']=$userDetails['FirstName'];
    $_SESSION['Privilege']=$userDetails['Privilege'];
}