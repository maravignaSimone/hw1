CREATE TABLE users (
    id integer primary key auto_increment,
    username varchar(16) not null unique,
    password varchar(255) not null,
    email varchar(255) not null unique,
    name varchar(255) not null,
    surname varchar(255) not null,
    phone varchar(16)
) Engine = InnoDB;

CREATE TABLE recipes (
    id integer primary key auto_increment,
    name varchar(255) not null,
    type varchar(16) not null,
    picture varchar(255) not null,
    user varchar(16)
) Engine = InnoDB;

CREATE TABLE stars(
    user integer not null,
    recipe integer not null,
    index idx_user(user),
    index idx_recipe(recipe),
    foreign key(user) references users(id),
    foreign key(recipe) references recipes(id),
    primary key(user, recipe)
) Engine = InnoDB;

INSERT INTO recipes(name, type, picture, user) VALUES
    ("Pasta alla carbonara", "Primi", "Carbonara.jpg", "Verde Salvia"),
    ("Pasta all'amatriciana", "Primi", "Amatriciana.jpg", "Verde Salvia"),
    ("Gnocchi alla sorrentina", "Primi", "Gnocchi_sorrentina.jpg", "Verde Salvia"),
    ("Insalata di riso", "Primi", "Insalata_di_riso.jpg", "Verde Salvia"),
    ("Lasagne alla bolognese", "Primi", "Lasagne_bolognese.jpg", "Verde Salvia"),
    ("Linguine al nero di seppia", "Primi", "Nero_di_seppia.jpg", "Verde Salvia"),
    ("Risotto tricolore", "Primi", "Risotto_tricolore.jpg", "Verde Salvia"),
    ("Risotto allo zafferano", "Primi", "Risotto_zafferano.jpg", "Verde Salvia"),
    ("Tortellini al sugo", "Primi", "Tortellini_sugo.jpg", "Verde Salvia")

INSERT INTO recipes(name, type, picture, user) VALUES
    ("Calamari ripieni", "Secondi", "Calamari_ripieni.jpg", "Verde Salvia"),
    ("Pollo al curry", "Secondi", "Pollo_curry.jpg", "Verde Salvia"),
    ("Scaloppine ai funghi", "Secondi", "Scaloppine_funghi.jpg", "Verde Salvia"),
    ("Vitello tonnat", "Secondi", "Vitello_tonnato.jpg", "Verde Salvia");

INSERT INTO recipes(name, type, picture, user) VALUES
    ("Brownies", "Dolci", "Brownies.jpg", "Verde Salvia"),
    ("Cheesecake alla stracciatella", "Dolci", "Cheesecake_stracciatella.jpg", "Verde Salvia"),
    ("Pancake", "Dolci", "Pancake.jpg", "Verde Salvia"),
    ("Tiramisu", "Dolci", "Tiramisu.jpg", "Verde Salvia");