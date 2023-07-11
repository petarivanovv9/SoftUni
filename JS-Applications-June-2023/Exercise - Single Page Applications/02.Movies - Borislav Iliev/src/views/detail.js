import { displayView, elementFactory } from './util.js';
import { homeView } from './home.js';
import { editView } from './edit.js';

const section = document.querySelector('#movie-example')

// display details page with the movie selected
export function detailsView(id) {
    displayView(section);

    displayMovie(id);
}

// function for displaying the movie selected
async function displayMovie(id) {
    const [ movie, likes, ownLike ] = await Promise.all([
        getMovie(id),
        getLikes(id),
        hasLiked(id)
    ])

    section.replaceChildren(createMovieCard(movie, likes, ownLike));
}

// create the movie card for the movie selected, while keeping in mind whether the user:
// - is the owner of the movie (can edit, delete, like and see the likes)
// - is a logged user (can like and see the likes)
// - is not logged in (can only see the likes)]
// - if the user has liked the movie already
function createMovieCard(movie, likes, ownLike) {
    const imageContainer = elementFactory('div', {
        'class': 'col-md-8'
    }, elementFactory('img', {
        'class': 'img-thumbnail',
        'src': `${movie.img}`,
        'alt': 'Movie'
    }));

    const titleElement = elementFactory('h1', {}, `Movie title: ${movie.title}`);

    const descriptionHeader = elementFactory('h3', {
        'class': 'my-3'
    }, 'Movie Description');
    const descriptionParagraph = elementFactory('p', {}, movie.description)

    // array to keep all elements the infoContainer contains
    const allInfo = [];

    allInfo.push(descriptionHeader);
    allInfo.push(descriptionParagraph);
    allInfo.push(...createControls(movie, likes, ownLike));
    
    const infoContainer = elementFactory('div', {
        'class': 'col-md-4 text-center'
    }, ...allInfo);

    const card = elementFactory('div', {
        'class': 'row bg-light text-dark'
    }, titleElement, imageContainer, infoContainer);

    const container = elementFactory('div', {
        'class': 'container'
    }, card);

    return container;
}

// create the buttons (such as: edit, delete, like and see the likes)
function createControls(movie, likes, ownLike) {
    const user = JSON.parse(localStorage.getItem('user'));

    const isOwner = user && user._id == movie._ownerId;

    let allButtons = [];

    if (isOwner) {
        const deleteButton = elementFactory('a', {
            'class': 'btn btn-danger',
            'href': '#',
            'data-id': `${movie._id}`
        }, 'Delete');
        const editButton = elementFactory('a', {
            'class': 'btn btn-warning',
            'href': '#',
            'data-id': `${movie._id}`
        }, 'Edit');

        allButtons.push(deleteButton);
        allButtons.push(editButton);

        deleteButton.addEventListener('click', onClickControl);
        editButton.addEventListener('click', onClickControl);
    } else if (user && !ownLike) {
        const likeButton = elementFactory('a', {
            'class': 'btn btn-primary',
            'href': '#',
            'data-id': `${movie._id}`
        }, 'Like');

        allButtons.push(likeButton);

        likeButton.addEventListener('click', onClickControl);
    }

    const counterLikes = elementFactory('span', {
        'class': 'enrolled-span'
    }, `Liked ${likes}`);

    allButtons.push(counterLikes);

    return allButtons;
}

// when a button is clicked => perform the operation
function onClickControl(event) {
    event.preventDefault();

    const movieId = event.target.dataset.id;
    const option = event.target.textContent;

    switch (option) {
        case 'Delete':
            deleteMovie(movieId);
        break;
        case 'Edit':
            editMovie(movieId);
        break;
        case 'Like':
            likeMovie(movieId);
        break;
    }
}

// MOVIE CONTROL OPTIONS ----------------------------------------------------------------------------------------------------------
async function likeMovie(movieId) {
    const user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    });

    detailsView(movieId);
}

async function deleteMovie(movieId) {
    const user = JSON.parse(localStorage.getItem('user'));

    await fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': user.accessToken,
            'Content-Type': 'application/json'
        } 
    });

    alert('Successfully deleted!')

    homeView();
}

async function editMovie(movieId) {
    editView(movieId);
}

// 
async function getMovie(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await res.json();

    return movie;
}

async function getLikes(id) {
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}

async function hasLiked(movieId) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return false;
    } else {
        const userId = user._id;

        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return Boolean(like.length);
    }
}