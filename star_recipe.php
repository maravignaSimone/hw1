<?php
    require_once 'dbconfig.php';
    session_start();

    if(isset($_SESSION['session_user_id'])) {
        $user = $_SESSION['session_user_id'];
    }
    else exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $user = mysqli_real_escape_string($conn, $user);
    $recipeid = mysqli_real_escape_string($conn, $_POST["recipeid"]);

    $query = "INSERT INTO stars(user, recipe) VALUES($user, $recipeid)";

    $res = mysqli_query($conn, $query) or die(mysqli_connect_error());

    if($res){
        echo json_encode(array('add' => true));
        mysqli_close($conn);
        exit;
    }

    mysqli_close($conn);
    echo json_encode(array('add' => false));

?>