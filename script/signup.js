function checkName(event) {
    const nameInput = event.currentTarget;
    
    if (formChecked[nameInput.name] = nameInput.value.length > 0) {
        nameInput.parentNode.parentNode.classList.remove('errorjs');
    } else {
        nameInput.parentNode.parentNode.classList.add('errorjs');
    }
    
}

function jsonCheckUsername(json) {
    if (formChecked.username = !json.exists) {
        document.querySelector('.username').classList.remove('errorjs');
    } else {
        document.querySelector('.username span').textContent = "Nome utente già utilizzato";
        document.querySelector('.username').classList.add('errorjs');
    }
}

function jsonCheckEmail(json) {
    if (formChecked.email = !json.exists) {
        document.querySelector('.email').classList.remove('errorjs');
    } else {
        document.querySelector('.email span').textContent = "Email già utilizzata";
        document.querySelector('.email').classList.add('errorjs');
    }
}

function onResponse(response) {
    return response.json();
}

function checkUsername(event) {
    const inputUsername = event.currentTarget;

    if(!/^[a-zA-Z0-9]{1,16}$/.test(inputUsername.value)) {
        inputUsername.parentNode.parentNode.querySelector('span').textContent = "Sono ammessi solo lettere e numeri.";
        inputUsername.parentNode.parentNode.classList.add('errorjs');
        formChecked.username = false;
    } else {
        fetch("check_username.php?q="+encodeURIComponent(inputUsername.value)).then(onResponse).then(jsonCheckUsername);
    }    
}

function checkEmail(event) {
    const emailInput = event.currentTarget;
    
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value)) {
        document.querySelector('.email span').textContent = "Email non valida";
        document.querySelector('.email').classList.add('errorjs');
        formChecked.email = false;
    } else {
        fetch("check_email.php?q="+encodeURIComponent(emailInput.value)).then(onResponse).then(jsonCheckEmail);
    }
}

function checkPassword(event) {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;
    const passwordInput = event.currentTarget;
    if (formChecked.password = regularExpression.test(passwordInput.value)) {
        document.querySelector('.password').classList.remove('errorjs');
    } else {
        document.querySelector('.password').classList.add('errorjs');
    }
}

function checkConfirmPassword(event) {
    const confirmPasswordInput = event.currentTarget;
    if (formChecked.confirmPassord = confirmPasswordInput.value === document.querySelector('.password input').value) {
        document.querySelector('.confirm_password').classList.remove('errorjs');
    } else {
        document.querySelector('.confirm_password').classList.add('errorjs');
    }
}

function checkForm(event){
    if(!document.querySelector('.check input').checked ||
        Object.keys(formChecked).length < 7 ||
        Object.values(formChecked).includes(false))
        event.preventDefault();
}

const formChecked = {'upload': true};
document.querySelector('.name input').addEventListener('blur', checkName);
document.querySelector('.surname input').addEventListener('blur', checkName);
document.querySelector('.username input').addEventListener('blur', checkUsername);
document.querySelector('.email input').addEventListener('blur', checkEmail);
document.querySelector('.password input').addEventListener('blur', checkPassword);
document.querySelector('.confirm_password input').addEventListener('blur', checkConfirmPassword);
document.querySelector('.submit input').addEventListener('click', checkForm);