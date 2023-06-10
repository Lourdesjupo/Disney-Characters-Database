'use strict';
const ulList = document.querySelector('.js_ulList');
const favsList = document.querySelector('.js_favsList');
const parseFavList = JSON.parse(localStorage.getItem('favCharacter'));

let dataCharacter;
let dataInfo;
let favoritesCharacters = [];

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
  iconElement.classList.add('fa-solid', 'fa-heart');
  anchorElement.classList.add('card__fav', 'js_fav');
  anchorElement.appendChild(iconElement);
  liElement.appendChild(anchorElement);
  liElement.appendChild(imgElement);
  liElement.appendChild(divElement);
  divElement.appendChild(h2Element);
  liElement.appendChild(divElement);
  ulList.appendChild(liElement);
  anchorElement.addEventListener('click', (ev) => {
    selectFavorite(ev, character);
  });
}
function getListCharacter() {
  if (parseFavList) {
    parseFavList.forEach((chara) => {
      favoritesCharacters.push(chara);
    });
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
function selectFavorite(ev, character) {
  const findCharacterInFav = favoritesCharacters.findIndex(
    (el) => el._id === character._id
  );
  if (findCharacterInFav < 0) {
    favoritesCharacters.push(character);
    localStorage.setItem('favCharacter', JSON.stringify(favoritesCharacters));
  }
  console.log(favoritesCharacters);
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
getListCharacter();

// ulList.addEventListener('click', selectFavorite);
