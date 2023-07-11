import { homeView } from './home.js';
import { displayView } from './util.js';

const section = document.querySelector('#add-movie');
const form = document.querySelector('#add-movie-form');

form.addEventListener('submit', onSubmit);

export function createView() {
    displayView(section);
}

 function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');
    if (title == '' || description == '' || img == '') {
        return alert('Empty input field');
    }
     createMovie(title, description, img);
}

async function createMovie(title, description, img) {
  
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        // if(!body){
        //     throw new Error("No data!!")
        //  }
         if(!user){
            throw new Error("No user permission!!")
         }
    
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({
                title,
                description,
                img
            })
        });
    

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data =await res.json() 
        // alert('Successfully added movie!');
        form.reset();
         homeView();
    } catch (err) {
        alert(err.message);
    }

    
}