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

    $query = "SELECT * FROM stars WHERE user = '$user' AND recipe = '$recipeid'";

    $res = mysqli_query($conn, $query) or die(mysqli_connect_error());

    if(mysqli_num_rows($res) > 0){
        echo json_encode(array('full' => true));
        mysqli_close($conn);
        exit;
    }

    mysqli_close($conn);
    echo json_encode(array('full' => false));

?>