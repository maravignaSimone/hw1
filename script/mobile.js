function mobileMenu(event){
    event.currentTarget.removeEventListener('click', mobileMenu);

    const links = document.querySelector('.link_mobile');
    links.classList.remove('hidden');
    links.classList.add('modale');
    document.body.classList.add('no_scroll');
    const exitModale = document.querySelector('.link_mobile.modale');
    exitModale.addEventListener('click', removeModale);
}

function removeModale(event){
    const remove = event.currentTarget;
    remove.classList.add('hidden');
    remove.classList.remove('modale');
    document.body.classList.remove('no_scroll');
    const mobileButton = document.querySelector('#menu_mobile');
    mobileButton.addEventListener('click',mobileMenu);
}

const mobileButton = document.querySelector('#menu_mobile');
mobileButton.addEventListener('click', mobileMenu);