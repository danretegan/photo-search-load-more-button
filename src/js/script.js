import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './api.js';
import { createCardsList } from './markup.js';

const searchButton = document.querySelector('.search-form-button');
const inputField = document.querySelector('.search-form-input');
const imageGallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

let currentPageNumber = 1;
let itemsPerPage = 40;

loadMoreButton.style.display = 'none';

searchButton.addEventListener('click', async e => {
  loadMoreButton.style.display = 'none';
  e.preventDefault();
  clearGallery();
  const searchTerm = inputField.value.trim();

  if (searchTerm === '') {
    Notiflix.Notify.warning('Please enter a search query.');
    return;
  }

  try {
    const queryResults = await searchImages(searchTerm, currentPageNumber);
    console.log(queryResults);

    if (queryResults.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      if (
        currentPageNumber < Math.ceil(queryResults.totalHits / itemsPerPage)
      ) {
        loadMoreButton.style.display = 'block';
      }
      const markup = createCardsList(queryResults.hits);
      imageGallery.innerHTML += markup; // Update the gallery here
      Notiflix.Notify.success(
        `Hooray! We found ${queryResults.totalHits} images.`
      );
      lightbox.refresh();
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPageNumber += 1;
  const searchTerm = inputField.value.trim();
  loadMoreButton.style.display = 'none';

  try {
    const queryResults = await searchImages(searchTerm, currentPageNumber);
    if (queryResults.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no more images to load.');
    } else if (
      currentPageNumber < Math.ceil(queryResults.totalHits / itemsPerPage)
    ) {
      const markup = createCardsList(queryResults.hits);
      imageGallery.innerHTML += markup; // Update the gallery here
      loadMoreButton.style.display = 'flex';
      Notiflix.Notify.success(
        `We found ${queryResults.hits.length} more images.`
      );
      lightbox.refresh();
    } else if (
      currentPageNumber === Math.ceil(queryResults.totalHits / itemsPerPage)
    ) {
      const markup = createCardsList(queryResults.hits);
      imageGallery.innerHTML += markup; // Update the gallery here
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.success(
        `We found ${queryResults.hits.length} more images.`
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

function clearGallery() {
  imageGallery.innerHTML = '';
  currentPageNumber = 1;
  loadMoreButton.style.display = 'none';
}
