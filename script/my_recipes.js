function fetchFavorites(){
    fetch("fetch_favorite.php").then(onResponse).then(fetchFavoriteJson);
}

function onResponse(response) {
    return response.json();
}

function fetchFavoriteJson(json){
    //console.log(json);
    const recipeContainer = document.querySelector('.recipes');
    recipeContainer.innerHTML='';

    if(json.length == 0){
        const noRecipe = document.createElement('h3');
        noRecipe.textContent = "Nessuna ricetta preferita";
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

    fetchFavorites();
}

fetchFavorites();