import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfoDescription = document.querySelector('.cat-info');

loader.classList.add('is-hidden');
error.classList.add('is-hidden');

//empty array on the cat from api
const myCatArray = [];

fetchBreeds()
  .then(response => {
    response.forEach(elem => {
      myCatArray.push(`<option value="${elem.id}">${elem.name}</option>`);
    });
    breedSelect.insertAdjacentHTML('beforeend', myCatArray);

    new SlimSelect({
      select: breedSelect,
    });
  })
  .catch(error => {
    Notify.failure('Error Fetching Data, Try Reload Page', {
      position: 'center-top',
      clickToClose: true,
      timeout: 10000,
    });
  });

function chooseCat(event) {
    Loading.circle(`Loading data, please wait...`);
  const selectedCat = event.target.selectedOptions[0];

  fetchCatByBreed(selectedCat.value)
    .then(response => {
      catInfoDescription.innerHTML = `
        
        <div class="group-cats">
        <div>
        <img src="${response[0].url}" alt ="${response[0].breeds[0].name}" width="350">
        </div>
        <div class="description">
        <h1 class="cats__name">${response[0].breeds[0].name}</h1>
        <p class="cats__description">${response[0].breeds[0].description}</p>
        <p class="cats__temperament"><b>Temperament: </b>${response[0].breeds[0].temperament}</p>
        </div>
        </div>
        `;
        Loading.remove();
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-top',
        clickToClose: true,
        timeout: 10000,
      });
    });
}

breedSelect.addEventListener('change', chooseCat);
