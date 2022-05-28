<?php
    require_once 'dbconfig.php';

    header('Content-Type: application/json');
    
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $email = mysqli_real_escape_string($conn, $_GET["q"]);

    $query = "SELECT email FROM users WHERE email = '$email'";

    $res = mysqli_query($conn, $query) or die(mysqli_connect_error());

    if(mysqli_num_rows($res) > 0){
        echo json_encode(array('exists' => true));
    }
    else echo json_encode(array('exists' => false));

    mysqli_close($conn);
?>