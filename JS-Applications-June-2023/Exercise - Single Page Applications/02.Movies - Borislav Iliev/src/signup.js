import { displayView, updateNav } from './util.js';
import { homeView } from './home.js';
const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');

form.addEventListener('submit', onRegister);

export function signupView() {
    displayView(section);
}

function onRegister(e) {
e.preventDefault()
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    if (email == '' || password.length < 6 || password == "" || rePass == "" || password != rePass) {
        alert('Incorect email or password!');
        return;
      }
   
    register(email, password);
    
}

async function register(email, password) {
 
      const body = {
        email:email,
        password:password
      }
    
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      }
      try {
    
        const response = await fetch('http://localhost:3030/users/register', options)
    
        if (response.status == 409) {
          throw new Error('User with this email exists')
        }
        const data = await response.json()
      
        localStorage.setItem('user', JSON.stringify(data))
        form.reset()
        updateNav()
        homeView()
        // alert('Successfully registered.');
        return data 
    } catch (err) {
        alert(err.message);
    }

   
}
