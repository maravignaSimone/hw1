function changeType(event){
    const chosenType = event.currentTarget;

    chosenType.classList.add("selected");

    const otherTypes = chosenType.parentNode.querySelectorAll(".type");
    for(const t of otherTypes){
        if(t.dataset.type !== chosenType.dataset.type){
            t.classList.remove('selected');
        }
    }
    
    typeSelected = chosenType.dataset.type;
    fetchRecipes();
}

function fetchRecipes(){
    fetch("fetch_recipe.php?type=" + typeSelected).then(onResponse).then(fetchRecipesJson);
}

function onResponse(response) {
    return response.json();
}

function fetchRecipesJson(json){
    //console.log(json);
    const recipeContainer = document.querySelector('.recipes');
    recipeContainer.innerHTML='';

    for(let i in json){
        const recipe = document.createElement('div');
        recipe.classList.add('recipe');
        recipe.dataset.id = json[i].id;
        const img = document.createElement('img');
        img.classList.add('food');
        img.src= "./img_db/" + json[i].picture;
        const textContainer = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = json[i].name;
        const star = document.createElement('img');
        star.classList.add('star');

        const formData = new FormData();
        formData.append('recipeid', json[i].id);
        fetch("upload_star.php", {method: 'post', body: formData}).then(onResponse).then(function(json){return updateStar(json, star)});

        textContainer.appendChild(p);
        textContainer.appendChild(star);
        recipe.appendChild(img);
        recipe.appendChild(textContainer);
        recipeContainer.appendChild(recipe);
    }
}

function updateStar(json, star){
    if(json.full === true){
        star.addEventListener('click', unstarRecipe);
        star.src= "./image/star_full.png";
    }
    else{
        star.addEventListener('click', starRecipe);
        star.src= "./image/star_empty.png";
    }
}

function starRecipe(event){
    const button = event.currentTarget;

    const formData = new FormData();
    formData.append('recipeid', button.parentNode.parentNode.dataset.id);
    fetch("star_recipe.php", {method: 'post', body: formData}).then(onResponse);

    button.src = "./image/star_full.png";
    button.removeEventListener('click', starRecipe);
    button.addEventListener('click', unstarRecipe);
    
}

function unstarRecipe(event){
    const button = event.currentTarget;

    const formData = new FormData();
    formData.append('recipeid', button.parentNode.parentNode.dataset.id);
    fetch("unstar_recipe.php", {method: 'post', body: formData}).then(onResponse);

    button.src = "./image/star_empty.png";
    button.removeEventListener('click', unstarRecipe);
    button.addEventListener('click', starRecipe);
}

function searchRecipe() {
    const input = document.querySelector('input[type="text"]');
    const filter = input.value.toUpperCase();
    if(filter === ''){
        const recipeContainer = document.querySelector('.search');
        recipeContainer.innerHTML='';
        return;
    }
    //console.log("search_recipe.php?q=" + filter);
    fetch("search_recipe.php?q=" + filter).then(onResponse).then(onSearchJson);
}

function onSearchJson(json){
    const recipeContainer = document.querySelector('.search');
    recipeContainer.innerHTML='';

    if(json.length == 0){
        const noRecipe = document.createElement('h3');
        noRecipe.textContent = "Nessuna ricetta trovata";
        recipeContainer.appendChild(noRecipe);
        return;
    }

    for(let i in json){
        const recipe = document.createElement('div');
        recipe.classList.add('recipe');
        recipe.dataset.id = json[i].id;
        const img = document.createElement('img');
        img.classList.add('food');
        img.src= "./img_db/" + json[i].picture;
        const textContainer = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = json[i].name;
        const star = document.createElement('img');
        star.classList.add('star');

        const formData = new FormData();
        formData.append('recipeid', json[i].id);
        fetch("upload_star.php", {method: 'post', body: formData}).then(onResponse).then(function(json){return updateStar(json, star)});

        textContainer.appendChild(p);
        textContainer.appendChild(star);
        recipe.appendChild(img);
        recipe.appendChild(textContainer);
        recipeContainer.appendChild(recipe);
    }
}

function fetchSong(){
    fetch("spotify_api.php").then(onResponse).then(onSpotifyJson);
}

function onSpotifyJson(json){
    //console.log(json);
    const spotify = document.querySelector('.spotify');
    spotify.innerHTML='';
    const testo = document.createElement('h1');
    testo.textContent = "Imposta il timer per la cottura della pasta con le playlist Barilla...";
    spotify.appendChild(testo);

    for(let i=0; i<5; i++){
        const playlist_div = document.createElement('div');
        const playlist = json.playlists.items[i];
    
        const img = document.createElement('img');
        img.classList.add('thumbnail');
        img.src = playlist.images[0].url;
    
        const playlist_name = document.createElement('span');
        playlist_name.textContent = playlist.name;
    
        const playlist_link = document.createElement('a');
        playlist_link.classList.add('link');
        playlist_link.href = playlist.uri;
    
        const play_button = document.createElement('img');
        play_button.classList.add('play');
        play_button.src = "./image/play_spotify.png"
    
        playlist_link.appendChild(play_button);
    
        playlist_div.appendChild(img);
        playlist_div.appendChild(playlist_name);
        playlist_div.appendChild(playlist_link);
        spotify.appendChild(playlist_div);
    }
}

//Main
var typeSelected = "Primi";
const types = document.querySelectorAll('.type');
for(const t of types){
    t.addEventListener('click', changeType);
}

fetchRecipes();
fetchSong();