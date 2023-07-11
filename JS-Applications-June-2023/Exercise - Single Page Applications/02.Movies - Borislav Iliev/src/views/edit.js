import { homeView } from './home.js';
import { displayView } from './util.js';

const section = document.querySelector('#edit-movie');
const form = section.querySelector('form');

form.addEventListener('submit', onEdit);

let currMovieId = '';

export function editView(id) {
    currMovieId = id;

    createSection();

    displayView(section);
}

async function createSection() {
    const titleField = section.querySelector('#title');
    const descriptionField = section.querySelector('textarea[name="description"]');
    const urlField = section.querySelector('#imageUrl');

    const movie = await getMovie(currMovieId);

    titleField.value = movie.title;
    descriptionField.value = movie.description;
    urlField.value = movie.img;
}

function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    edit(title, description, img);

    currMovieId = '';

    homeView();
}

async function edit(title, description, img) {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        const res = await fetch(`http://localhost:3030/data/movies/${currMovieId}`, {
            method: 'PUT',
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

        if (res.ok) {
            alert('Successfully edited movie.');
        }
    } catch (err) {
        alert(err.message);
    }
}

async function getMovie(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await res.json();

    return movie;
}