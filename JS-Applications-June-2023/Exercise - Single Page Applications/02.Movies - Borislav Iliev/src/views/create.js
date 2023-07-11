import { homeView } from './home.js';
import { displayView } from './util.js';

const section = document.querySelector('#add-movie');
const form = document.querySelector('#add-movie-form');

form.addEventListener('submit', onSubmit);

export function createView() {
    displayView(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    await createMovie(title, description, img);
}

async function createMovie(title, description, img) {
    /*
    https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg

    The Gray Man 

    When the CIA's most skilled operative-whose true identity is known to none-accidentally uncovers dark agency secrets, a psychopathic former colleague puts a bounty on his head, setting off a global manhunt by international assassins.

    */

    const user = JSON.parse(localStorage.getItem('user'));

    try {
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

        alert('Successfully added movie!');
    } catch (err) {
        alert(err.message);
    }

    form.reset();

    homeView();
}