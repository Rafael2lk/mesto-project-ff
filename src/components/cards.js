const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, deleteCallback, likeCallbak, openImgCaallbak) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButtonIcon = cardElement.querySelector('.card__delete-button');
  const LikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = cardData.link;
  cardImage.alt = `Это пейзаж из места со следующим названием ― ${cardData.name}`;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  deleteButtonIcon.addEventListener('click', () => {
    deleteCallback(deleteButtonIcon);
  });

  LikeButton.addEventListener('click', () => {
    likeCallbak(LikeButton);
  });
  openImgCaallbak(cardImage);
  return cardElement;
}

function deleteCard(deleteButton) {
  const listItem = deleteButton.closest('.places__item.card');
  listItem.remove();
}

function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}

export {createCard, deleteCard, likeCard};


