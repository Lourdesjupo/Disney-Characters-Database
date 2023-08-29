'use strict';

const ulList = document.querySelector('.js_ulList');
const favsList = document.querySelector('.js_favsList');
const searchBtn = document.querySelector('.js_sbtn');
const favBtn = document.querySelector('.js_fbtn');
const deleteFav = document.querySelector('.js_delete');
const favSection = document.querySelector('.favorites');
const backBtn = document.querySelector('.js_back');
const pagesInfo = document.querySelector('.js_pages');
const forward = document.querySelector('.js_forward');
const pagination = document.querySelector('.js_pagination');
const cardWarning = document.querySelector('.card-warning');

//verifico si existe o no una lista en el localStorage si no existe lo inicializa con un array vacío.
let favoritesCharacters =
  JSON.parse(localStorage.getItem('favCharacter')) !== null
    ? JSON.parse(localStorage.getItem('favCharacter'))
    : [];
let dataCharacter;
let dataInfo;
let url = `http://api.disneyapi.dev/character`;
//contador de páginas para saber la página en la que se encuentra el usuario.
let pages = 1;

//función que recibe un array, borra el contenido de la lista de personajes y llama a la función render character a la cual le irá pasando todos los personajes del array
//renderCharacter recibe un objeto.
function renderListCharacter(dataList) {
  ulList.innerHTML = '';
  for (const data of dataList) {
    renderCharacter(data);
  }
}
//función que recibe un objeto. Crea la estructura de la lista en el Dom.
//Verifica si se recibe una url en la imagen, si no la recibe o el valor es undefined se incluye la imagen del placeholder.
//Se crea un addEventListener en todos los anchor para saber cuando se clicka el icono like.
//por cada psj que pinta evalua previamente si está en la lista de los favoritos y si está le pone el corazón sólido para indicar que es un fav.
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
    character.imageUrl === undefined || character.imageUrl === ''
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
  const nSeries = document.createElement('p');
  nSeries.classList.add('card__title');
  if (character.tvShows.length > 3) {
    nSeries.innerText = `El psj es popular ${character.tvShows.length}`;
  } else {
    nSeries.innerText = `${character.tvShows.length}`;
  }

  iconElement.addEventListener('click', (ev) => {
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
//función que valida si el array de favoritos tiene datos y si los tiene, llama a la función de renderFavourites para pintarlos.Le pasa como parametro un array.
//y además hace las peticiones al servidor de la lista de personajes y paginación. Una vez cumplidas las promises se llama a la función renderListCharacter para pintar la lista de personajes.
function getListCharacter() {
  //si existe una lista en favoritesCharacters lo pinta.
  if (favoritesCharacters) {
    renderFavourites(favoritesCharacters);
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dataCharacter = data.data;
      dataInfo = data.info;
      pagesInfo.innerText = `${pages} de ${dataInfo.totalPages}`;
      renderListCharacter(dataCharacter);
      cardWarning.classList.add('no-display');
    })
    .catch(() => {
      cardWarning.classList.remove('no-display');
    });
}
//función que recibe un evento y un personaje(objeto) (se llama desde renderCharacter al crear el evento al anchor de like).
//Se valida el elemento que selecciona el usuario y se busca si el id del personaje(el recibido por el fetch) ya existe en la lista de favoritos.
// si findCharacterInFav es menor a 0 indica que no está en favoritos y por lo tanto lo guarda en el local storage y modificar el icono de like a relleno.
//en caso contrario, si lo encuentra, elimina el personaje de la lista de favoritos, actualiza el local storage y modifica el icono de like para que sea 'vacio'.
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
    localStorage.setItem('favCharacter', JSON.stringify(favoritesCharacters));
    selectedCharacterInList.classList.remove('fa-solid');
    selectedCharacterInList.classList.add('fa-regular');
  }

  renderFavourites(favoritesCharacters);
}
//función que recibe un array (la llama addFavorite tras evaluar si el psj es o no un favorito).Borra la lista actual de favoritos y
// actualiza en la sección de favoritos las imagenes de los personajes, verifica si el personaje tiene o no imagen y si no tiene le añade el placeholder y crea un evento.
//El evento se crea para saber que personaje quiere borrar el usuario.
//se evalua si hay elementos en la lista de favoritos para mostrar/ocultar la sección
function renderFavourites(list) {
  favsList.innerHTML = '';
  list.forEach((chara) => {
    const liElement = document.createElement('li');
    const imgElement = document.createElement('img');
    const anchorElement = document.createElement('a');
    const iconElement = document.createElement('i');
    liElement.classList.add('fav');
    imgElement.classList.add('fav__img');
    imgElement.src =
      chara.imageUrl === ''
        ? 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'
        : chara.imageUrl;
    liElement.appendChild(imgElement);
    anchorElement.classList.add('fav__delete', 'js_delete');
    iconElement.classList.add('fa-solid', 'fa-xmark', 'icon__delete');
    anchorElement.appendChild(iconElement);
    liElement.appendChild(anchorElement);
    favsList.appendChild(liElement);
    anchorElement.addEventListener('click', (ev) => {
      deleteFavorite(ev, chara);
    });
  });
  if (favoritesCharacters.length === 0) {
    favSection.classList.add('no-display');
  } else {
    favSection.classList.remove('no-display');
  }
}

//función que recibe un evento. Busca el texto que el usuario escribe en el buscador y crea una petición al servidor con el personaje buscado.
//Una vez resuelta la promise llama a la función que renderiza la lista de personajes.
//se evalua si en el campo de búsqueda se incluye o no un termino, si se incluye se oculta la paginación, si no se indica ningún término,
//se asume que el usuario quiere ver todo el listado y por lo tanto se muestra de nuevo la paginación.
function searchCharacter(ev) {
  ev.preventDefault();
  const inputSearch = document.querySelector('.js_search').value;
  if (inputSearch === '') {
    pagination.classList.remove('no-display');
  } else {
    pagination.classList.add('no-display');
  }
  fetch(`https://api.disneyapi.dev/character?name=${inputSearch}`)
    .then((response) => response.json())
    .then((data) => {
      renderListCharacter(data.data);
    });
}
//función que recibe un evento y un objeto. Busca dentro del listado de favoritos si se encuentra el id del personaje (el objeto se recibe de la función renderFavorite)
//si lo encuentra elimina(índice) el elemento, actualiza la lista del localStorage y renderiza tanto los favoritos como la lista de los personajes.
function deleteFavorite(ev, chara) {
  const favForDelete = favoritesCharacters.findIndex(
    (el) => el._id === chara._id
  );
  favoritesCharacters.splice(favForDelete, 1);
  localStorage.setItem('favCharacter', JSON.stringify(favoritesCharacters));
  renderFavourites(favoritesCharacters);
  renderListCharacter(dataCharacter);
}
//función que elimina todos los favoritos, actualiza el localStorage y renderiza la lista
//de favoritos y la lista de psj.
//se oculta la sección de favoritos
function deleteListFavorites() {
  //accedo a los elementos de favoritos y desde la posición 0 borro todos los indices.
  favoritesCharacters.splice(0, favoritesCharacters.length);
  localStorage.setItem('favCharacter', JSON.stringify(favoritesCharacters));
  favSection.classList.add('no-display');
  renderFavourites(favoritesCharacters);
  renderListCharacter(dataCharacter);
}
//función para mostrar u ocultar la sección de favoritos.
function favSectionClick() {
  favSection.classList.toggle('no-display');
}
//función para navegar entre las páginas atrás y siguiente
//recibe un evento para saber que botón se ha clickado y se modifica la url con la página siguiente o anterior para hacer la consulta
//se actualiza el campo pagesInfo para saber en que página se encuentra el usuario.
//se verifica si estás en la primera página para que no se mande la petición.
function requestNewPage(ev) {
  const btn = ev.target.id;
  url = dataInfo[btn];
  if (btn === 'previousPage' && pages !== 1) {
    getListCharacter();
    pages--;
    pagesInfo.innerText = `${pages} de ${dataInfo.totalPages}`;
  } else if (btn === 'nextPage') {
    pages++;
    pagesInfo.innerText = `${pages} de ${dataInfo.totalPages}`;
    getListCharacter();
  }
}

getListCharacter();

searchBtn.addEventListener('click', searchCharacter);
deleteFav.addEventListener('click', deleteListFavorites);
favBtn.addEventListener('click', favSectionClick);
backBtn.addEventListener('click', requestNewPage);
forward.addEventListener('click', requestNewPage);
