import { displayView, elementFactory } from './util.js';
import { homeView } from './home.js';
import { editView } from './edit.js';

const section = document.querySelector('#movie-example')


export function detailsView(id) {
    displayView(section);

    displayMovie(id);
}

export async function displayMovie(id) {
    const user = JSON.parse(localStorage.getItem('user'))
    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        hasLiked(id,user)
    ])

    section.replaceChildren(onCreateMovie(movie, user, likes, ownLike));
}

function onCreateMovie(movie, user, likes, ownLikes) {

    console.log(movie)
    const element = document.createElement('div')
    element.className = 'container'

    element.innerHTML = `
  <div class="row bg-light text-dark">
  
  <h1>Movie title: ${movie.title}</h1>
    <div class="col-md-8">
      <img class="img-thumbnail" src="${movie.img}" alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>
        ${movie.description}
        </p>
      ${onControls(movie, user, likes, ownLikes)}
    </div>
  </div> 
  `
    const deleteBtn = element.querySelector('a[data-id="delete-button"]');
    const editBtn = element.querySelector('a[data-id="edit-button"]');
    const likeBtn = element.querySelector('a[data-id="like-function"]')

    //  const likeBtn = element.querySelector('.like-btn')


    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => deleteMovie(e, movie._id));
        editBtn.addEventListener('click', (e) => editMovie(e, movie._id));
    } else if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id))
    }
    return element

}
function onControls(movie, user, likes, ownLikes) {
    const likesArr = [];
    const token = localStorage.getItem('accessToken');
    const isOwner = user && user._id == movie._ownerId
    if (token&&isOwner) {
        likesArr.push(`<a data-id="delete-button" class="btn btn-danger delete-button" href="#">Delete</a>`)
        likesArr.push(`<a data-id="edit-button" class="btn btn-warning" href="#">Edit</a>`)
        likesArr.push(`<span class="enrolled-span">Liked ${likes}</span>`)
  
    } else if (token) {
        if(ownLikes){
            likesArr.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
            likesArr.push(`<a style="display: none;" data-id="like-function" class="btn btn-primary" href="#">Like</a>`);
        }else{
            likesArr.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
            likesArr.push(`<a style="display: inline-block;" data-id="like-function" class="btn btn-primary" href="#">Like</a>`);
        }
        
    }else{
        likesArr.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
    }
 
    return likesArr.join('')
}

// user && ownLikes == false


// function createMovieCard(movie, likes, ownLike) {
//     const imageContainer = elementFactory('div', {
//         'class': 'col-md-8'
//     }, elementFactory('img', {
//         'class': 'img-thumbnail',
//         'src': `${movie.img}`,
//         'alt': 'Movie'
//     }));

//     const titleElement = elementFactory('h1', {}, `Movie title: ${movie.title}`);

//     const descriptionHeader = elementFactory('h3', {
//         'class': 'my-3'
//     }, 'Movie Description');
//     const descriptionParagraph = elementFactory('p', {}, movie.description)

//     // array to keep all elements the infoContainer contains
//     const allInfo = [];

//     allInfo.push(descriptionHeader);
//     allInfo.push(descriptionParagraph);
//     allInfo.push(...createControls(movie, likes, ownLike));

//     const infoContainer = elementFactory('div', {
//         'class': 'col-md-4 text-center'
//     }, ...allInfo);

//     const card = elementFactory('div', {
//         'class': 'row bg-light text-dark'
//     }, titleElement, imageContainer, infoContainer);

//     const container = elementFactory('div', {
//         'class': 'container'
//     }, card);

//     return container;
// }

// create the buttons (such as: edit, delete, like and see the likes)
// function createControls(movie, likes, ownLike) {
//     const user = JSON.parse(localStorage.getItem('user'));

//     const isOwner = user && user._id == movie._ownerId;

//     let allButtons = [];

//     if (isOwner) {
//         const deleteButton = elementFactory('a', {
//             'class': 'btn btn-danger',
//             'href': '#',
//             'data-id': `${movie._id}`
//         }, 'Delete');
//         const editButton = elementFactory('a', {
//             'class': 'btn btn-warning',
//             'href': '#',
//             'data-id': `${movie._id}`
//         }, 'Edit');

//         allButtons.push(deleteButton);
//         allButtons.push(editButton);

//         deleteButton.addEventListener('click', onClickControl);
//         editButton.addEventListener('click', onClickControl);
//     } else if (user && !ownLike) {
//         const likeButton = elementFactory('a', {
//             'class': 'btn btn-primary',
//             'href': '#',
//             'data-id': `${movie._id}`
//         }, 'Like');

//         allButtons.push(likeButton);

//         likeButton.addEventListener('click', onClickControl);
//     }

//     const counterLikes = elementFactory('span', {
//         'class': 'enrolled-span'
//     }, `Liked ${likes}`);

//     allButtons.push(counterLikes);

//     return allButtons;
// }

// when a button is clicked => perform the operation

// function onClickControl(event) {
//     event.preventDefault();

//     const movieId = event.target.dataset.id;
//     const option = event.target.textContent;

//     switch (option) {
//         case 'Delete':
//             deleteMovie(movieId);
//         break;
//         case 'Edit':
//             editMovie(movieId);
//         break;
//         case 'Like':
//             likeMovie(movieId);
//         break;
//     }
// }

// MOVIE CONTROL OPTIONS ----------------------------------------------------------------------------------------------------------
async function likeMovie(e,movieId) {
   // e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'));
  
    try {
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
    } catch (err) {

        alert(err.message)

    }

}
async function deleteMovie(e,movieId) {
    // e.preventDefault()
   
    // try {
        let userDataInfo = JSON.parse(localStorage.getItem('user')) || null;
        let token = userDataInfo ? userDataInfo.accessToken : null;
        const id = movieId
        // if(token == null){
        //     throw new Error('no permission')
        // }
        const res = await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: 'DELETE',
            headers: {
                 'Content-Type': 'application/json',
                'X-Authorization': token,
            }
        });
        const data =await res.json()

        // if (res.ok == false) {
        //     const error = await res.json()
        //     throw new Error(error)
        // } else {
            alert('Movie deleted');
            displayMovie()
            homeView()   
            return data 
        // }
      
    // } catch (err) {

    //     alert(err)
    // }

}

async function editMovie(e,movieId) {
    e.preventDefault()
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

async function hasLiked(movieId,user) {
      if (!user) {
        return false;
    } else {
        const userId = user._id;

        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return like.length > 0;
    }
}