import { detailsView } from './detail.js';
import { displayView, elementFactory } from './util.js';

const section = document.querySelector('#home-page');
const catalog = document.querySelector('#movies-list');
catalog.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.preventDefault();

        const id = event.target.dataset.id;
        
        detailsView(id);
    }
})

export function homeView() {
    displayView(section);
    displayMovies();
}

export async function displayMovies() {
    const movies = await getMovies();

    catalog.replaceChildren(...movies.map(createMoviePreview))
}

function createMoviePreview(movie) {
    // const ownerId = movie._ownerId;
    const id = movie._id;
    const title = movie.title;
    // const description = movie.description;
    const imgUrl = movie.img;

    
    const detailsButton = elementFactory('button', {
        'data-id': `${id}`, 
        'class': 'btn btn-info' 
    }, 'Details');
    const aElement = elementFactory('a', {
        'href': `#/details/${id}`
    }, detailsButton);
    const cardFooterDiv = elementFactory('div', { 
        'class': 'card-footer' 
    }, aElement);

    const titleElement = elementFactory('h4', {
        'class': 'card-title'
    }, `${title}`);
    const cardBodyDiv = elementFactory('div', {
        'class': 'card-body'
    }, titleElement);

    const imgElement = elementFactory('img', {
        'class': 'card-img-top',
        'src': `${imgUrl}`,
        'alt': 'Card image cap',
        'width': '400'
    });

    const movieCardElement = elementFactory('li', {
        'class': 'card mb-4'
    }, imgElement, cardBodyDiv, cardFooterDiv);

    return movieCardElement;
}

async function getMovies() {
    try{
        const res = await fetch('http://localhost:3030/data/movies');
        if(!res.ok){
            const error=(await res.json())
            throw new Error(error.message)
        }
        const data = await res.json();
      
    return data;
    }catch(err){
        alert(err.message)
    }
  

}