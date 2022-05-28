<?php
    require_once 'dbconfig.php';
    
    session_start();

    if(isset($_SESSION['session_user_id'])) {
        header("Location: home.php");
        exit;
    }

    if (!empty($_POST["name"]) && !empty($_POST["surname"]) && !empty($_POST["username"]) && !empty($_POST["email"])
    && !empty($_POST["password"]) && !empty($_POST["confirm_password"]) && !empty($_POST["check"]))
    {
        $error = array();
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_connect_error());

        //VALIDAZIONE DATI LATO SERVER

        //Username
        //Controlla se Username ha caratteri validi e che sia meno di 15 caratteri
        if(!preg_match('/^[a-zA-Z0-9]{1,16}$/', $_POST['username'])){
            $error[] = "Username non valido";
        }
        else{
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            $query = "SELECT username FROM users WHERE username = '$username'";
            $res = mysqli_query($conn, $query);
            if(mysqli_num_rows($res) > 0 ){
                $error[] = "Username già in uso";
            }
        }

        //Password
        if(!preg_match('/^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/', $_POST['password'])){
            $error[] = "Password non valida";
        }

        //Conferma password
        if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
            $error[] = "Le password non coincidono";
        }

        //Email
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }
        
        //Registrazione nel database
        if(count($error) == 0){
            //escape di username e di email già fatto
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $surname = mysqli_real_escape_string($conn, $_POST['surname']);
            $phone = mysqli_real_escape_string($conn, $_POST['phone']);

            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = "INSERT INTO users(username, password, email, name, surname, phone) VALUES('$username', '$password', '$email', '$name', '$surname', '$phone')";

            if (mysqli_query($conn, $query)) {
                $_SESSION["session_username"] = $_POST["username"];
                $_SESSION["session_user_id"] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header("Location: home.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }
        mysqli_close($conn);
    }
    
?>

<html>
    <head>
        <link rel="stylesheet" href="./style/signup.css">
        <script src='./script/signup.js' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        <title> Verde Salvia - Registrati</title>
    </head>

    <body>
        <main class="signup">
        <section>
            <h1>Crea il tuo profilo</h1>
            <p>Entra nella community e salva le tue ricette preferite!</p>
            <h3>Inserisci i tuoi dati</h3>
            <form name='signup' method='post' enctype="multipart/form-data">
                <div class="name">
                    <div><label for="name">Nome</label></div>
                    <div><input type="text" name='name' placeholder='es. Mario'></div>
                    <span>Riempi questo campo</span>
                </div>
                <div class="surname">
                    <div><label for="surname">Cognome</label></div>
                    <div><input type="text" name='surname' placeholder='es. Rossi'></div>
                    <span>Riempi questo campo</span>
                </div>
                <div class="username">
                    <div><label for="username">Username</label></div>
                    <div><input type="text" name='username' placeholder='es. Mario_Rossi'></div>
                    <span>Username non valido</span>
                    <!-- questo span non verrà mai visualizzato, si usa solo per avere lo stesso spazio tra input-->
                </div>
                <div class="email">
                    <div><label for="email">Email</label></div>
                    <div><input type="text" name='email' placeholder='es. mariorossi@mail.com'></div>
                    <span>Email non valida</span>
                    <!-- questo span non verrà mai visualizzato, si usa solo per avere lo stesso spazio tra input-->
                </div>
                <div class="password">
                    <div><label for="password">Password</label></div>
                    <div><input type="password" name='password'></div>
                    <span>La password deve contenere almeno un numero e un simbolo.</span>
                </div>
                <div class="confirm_password">
                    <div><label for="confirm_password">Conferma Password</label></div>
                    <div><input type="password" name='confirm_password'></div>
                    <span>Le password non coincidono</span>
                </div>
                <div class="telefono">
                    <div><label for="phone">Numero di telefono</label></div>
                    <div><input type="text" name='phone' placeholder='(opzionale)'></div>
                    <span>Campo non obbligatorio</span>
                </div>
                <div class="check">
                    <div><input type='checkbox' name='check' value="1"></div>
                    <div><label for='check'>Acconsento ai Termini e Condizioni</label></div>
                </div>
                <div class="submit">
                    <input type='submit' value="REGISTRATI" id="submit">
                </div>
            </form>
            <div class="signin">Hai già un account? <a href="login.php">Accedi</a>
        </section>
        </main>
    </body>
</html>
