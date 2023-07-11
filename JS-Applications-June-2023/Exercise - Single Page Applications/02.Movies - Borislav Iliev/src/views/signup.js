import { displayView } from './util.js';

const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');

form.addEventListener('submit', onRegister);

export function signupView() {
    displayView(section);
}

function onRegister() {
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    if (!email || !password || !rePass) {
        alert('Please fill out all fields.');
        return;
    }

    if (password != rePass) {
        alert("Passwords don't match.");
        return;
    }
    
    register(email, password);

    form.reset();
}

async function register(email, password) {
    try {
        await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password
            })
        });
    } catch (err) {
        alert(err.message);
    }

    alert('Successfully registered.');
}