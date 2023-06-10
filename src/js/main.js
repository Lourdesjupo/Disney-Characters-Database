'use strict';
const ulList = document.querySelector('.js_ulList');
const favsList = document.querySelector('.js_favsList');
const searchBtn = document.querySelector('.js_sbtn');
const favBtn = document.querySelector('.js_fbtn');

//verifico si existe o no una lista en el localStorage si no existe lo inicializa con un array vacío.
let favoritesCharacters =
  JSON.parse(localStorage.getItem('favCharacter')) !== null
    ? JSON.parse(localStorage.getItem('favCharacter'))
    : [];
let dataCharacter;
let dataInfo;

function renderListCharacter(dataList) {
  ulList.innerHTML = '';
  for (const data of dataList) {
    renderCharacter(data);
  }
}
function renderCharacter(character) {
  const liElement = document.createElement('li');
  const imgElement = document.createElement('img');
  const divElement = document.createElement('div');
  const h2Element = document.createElement('h2');
  const anchorElement = document.createElement('a');
  const iconElement = document.createElement('i');
  liElement.classList.add('card', 'list');
  imgElement.classList.add('card__img');
  imgElement.src =
    character.imageUrl === ''
      ? 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'
      : character.imageUrl;
  imgElement.alt = character.name;
  divElement.classList.add('card__separator');
  h2Element.innerText = character.name;
  h2Element.classList.add('card__title');
  iconElement.classList.add('fa-regular', 'fa-heart', 'card__icon');
  anchorElement.classList.add('card__fav', 'js_fav');
  anchorElement.appendChild(iconElement);
  liElement.appendChild(anchorElement);
  liElement.appendChild(imgElement);
  liElement.appendChild(divElement);
  divElement.appendChild(h2Element);
  liElement.appendChild(divElement);
  anchorElement.addEventListener('click', (ev) => {
    addFavorite(ev, character);
  });
  //por cada psj que pinta evalua si está en la lista de los favoritos y si está le pone el corazón sólido para indicar que es un fav.
  for (let x = 0; x < favoritesCharacters.length; x++) {
    if (character._id === favoritesCharacters[x]._id) {
      iconElement.classList.add('fa-solid');
    }
  }
  ulList.appendChild(liElement);
}
function getListCharacter() {
  //si existe una lista en favoritesCharacters lo pinta.
  if (favoritesCharacters) {
    renderFavourites(favoritesCharacters);
  }

  fetch('https://api.disneyapi.dev/character')
    .then((response) => response.json())
    .then((data) => {
      dataCharacter = data.data;
      dataInfo = data.info;
      renderListCharacter(dataCharacter);
    });
}
function addFavorite(ev, character) {
  const selectedCharacterInList = ev.target;
  const findCharacterInFav = favoritesCharacters.findIndex(
    (el) => el._id === character._id
  );
  if (findCharacterInFav < 0) {
    favoritesCharacters.push(character);
    localStorage.setItem('favCharacter', JSON.stringify(favoritesCharacters));
    selectedCharacterInList.classList.remove('fa-regular');
    selectedCharacterInList.classList.add('fa-solid');
  } else {
    favoritesCharacters.splice(findCharacterInFav, 1);
    selectedCharacterInList.classList.remove('fa-solid');
    selectedCharacterInList.classList.add('fa-regular');
  }

  renderFavourites(favoritesCharacters);
}

function renderFavourites(list) {
  favsList.innerHTML = '';
  list.forEach((chara) => {
    const liElement = document.createElement('li');
    const imgElement = document.createElement('img');
    liElement.classList.add('fav');
    imgElement.classList.add('fav__img');
    imgElement.src =
      chara.imageUrl === ''
        ? 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'
        : chara.imageUrl;
    liElement.appendChild(imgElement);
    favsList.appendChild(liElement);
  });
}

function searchCharacter(ev) {
  ev.preventDefault();
  const inputSearch = document.querySelector('.js_search').value;
  fetch(`https://api.disneyapi.dev/character?name=${inputSearch}`)
    .then((response) => response.json())
    .then((data) => {
      renderListCharacter(data.data);
    });
}

getListCharacter();

searchBtn.addEventListener('click', searchCharacter);
