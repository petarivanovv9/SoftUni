
import { homeView, displayMovies } from './home.js';
import { displayView } from './util.js';
const details = document.querySelector('#movie-example')
const section = document.querySelector('#edit-movie');
const form = document.querySelector('form[data-id="edit-form"]');

form.addEventListener('submit', onEdit);

let currMovieId = '';

export function editView(id) {
    currMovieId = id;

    createSection();

    displayView(section);
}

async function createSection() {
    const titleField = document.querySelector('input[data-id="edit-title"]');
    const descriptionField = document.querySelector('textarea[data-id="edit-description"]');
    const urlField = document.querySelector('input[data-id="edit-img"]');



    const movie = await getMovie(currMovieId);

    titleField.value = movie.title;
    descriptionField.value = movie.description;
    urlField.value = movie.img;
}

function onEdit(event) {
    event.preventDefault();
const eEvent = event
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');
    if (title == '' || description == '' || img == '') {
        return alert('Empty input field');
    }
    edit(eEvent,title, description, img);

    currMovieId = '';


}

async function edit(e,title, description, img) {
    e.preventDefault()
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

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.status)
            // alert('Successfully edited movie.');
        }

        homeView();
        //  displayView(details)



    } catch (err) {
        alert(err.message);
    }
}

async function getMovie(id) {
    try {
        const res = await fetch(`http://localhost:3030/data/movies/${id}`);
        if (!res.ok) {
            throw new Error
        }
        const movie = await res.json();

        return movie;
    } catch (err) {
        alert(err.message)

    }

}