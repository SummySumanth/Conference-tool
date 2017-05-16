<?php

function createSession($userDetails){
    session_start();
    $_SESSION['Email']=$userDetails['Email'];
    $_SESSION['FirstName']=$userDetails['FirstName'];
    $_SESSION['Privilege']=$userDetails['Privilege'];
}