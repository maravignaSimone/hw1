<?php
    require_once 'dbconfig.php';
    session_start();

    if(isset($_SESSION['session_user_id'])) {
        $userid = $_SESSION['session_user_id'];
    }
    else{
        header("Location: login.php");
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $userid);
    $query = "SELECT * FROM users WHERE id = $userid";
    $res = mysqli_query($conn, $query);
    $user = mysqli_fetch_assoc($res);
?>

<html>
    <head>
        <link rel='stylesheet' href='./style/common_style.css'>
        <link rel='stylesheet' href='./style/home.css'>
        <script src='./script/home.js' defer></script>
        <script src='./script/mobile.js' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">

        <title>Verde Salvia</title>
    </head>

    <body>
        <header>
            <nav>
                <div class='logo'>
                    <a href="./">
                        <h1>Verde Salvia</h1>
                    </a>
                </div>
                <div class='menu'>
                    <p>Ciao <?php echo $user['name'] . " " . $user['surname']; ?> </p>
                    <a href="./" class='selected'>Home</a>
                    <a href="my_recipes.php">Le Mie Ricette</a>
                    <a href="logout.php">Logout</a>
                </div>
                <div id="menu_mobile">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>  
                <div class="link_mobile" class="hidden">
                    <a href="./">Home</a>
                    <a href="my_recipes.php">Le Mie Ricette</a>
                    <a href="logout.php">Logout</a>
                </div>
            </nav>
            <h1>Benvenuto in Verde Salvia!</h1>
            <p>Sapevi che uno dei migliori modi per migliorare la tua salute è preparare più ricette a casa?</p>
            <a href="#ricette"><button>Esplora le nostre ricette</button></a>
        </header>
        <main>
            <section id='ricette'>
                <div class='title'>
                    <h1>Lasciati ispirare da noi...</h1>
                    <div>
                        <h2 class='type selected' data-type="Primi">Primi</h2>
                        <h2 class='type' data-type="Secondi">Secondi</h2>
                        <h2 class='type' data-type="Dolci">Dolci</h2>
                    </div>
                </div>
                <div class='recipes'>

                </div>
            </section>
            <section class='search_recipe'>
                <h1>Oppure cerca una ricetta...</h1>
                <input type="text" onkeyup="searchRecipe()" placeholder="Cerca">
                <div class='search'>

                </div>
            </section>
            <section class='spotify'>
                
            </section>
            <footer>
                <address>DIEEI - UNICT</address>
                <p>Designed by Simone Maravigna 1000001109</p> 
            </footer>
        </main>
    </body>
</html>

<?php mysqli_close($conn); ?>