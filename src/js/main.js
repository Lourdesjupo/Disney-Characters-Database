'use strict';
const ulList = document.querySelector('.js_ulList');
let dataCharacter;
let dataInfo;

function renderListCharacter(dataList) {
  for (const data of dataList) {
    renderCharacter(data);
  }
}
function renderCharacter(character) {
  const liElement = document.createElement('li');
  const imgElement = document.createElement('img');
  const divElement = document.createElement('div');
  const h2Element = document.createElement('h2');
  liElement.classList.add('card','list');
  imgElement.classList.add('card__img');
  imgElement.src = character.imageUrl;
  imgElement.alt = character.name;
  divElement.classList.add('card__separator');
  h2Element.innerText = character.name;
  h2Element.classList.add('card__title');
  liElement.appendChild(imgElement);
  liElement.appendChild(divElement);
  divElement.appendChild(h2Element);
  liElement.appendChild(divElement);
  ulList.appendChild(liElement);

}

function getListCharacter() {

  fetch('https://api.disneyapi.dev/character')
    .then((response) => response.json())
    .then((data) => {
      dataCharacter = data.data;
      dataInfo = data.info;
      renderListCharacter(dataCharacter);
    });
}

getListCharacter();

