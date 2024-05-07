import './pages/index.css';
import { setCloseModalHandlers, popups, openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/cards.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {fetchResponseMethodGet, updateProfileData, addNewCard} from './components/api.js'

const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup.popup_type_edit');
const popupAddCard = document.querySelector('.popup.popup_type_new-card');
const profile = document.querySelector('.profile.page__section');
const profileImage = profile.querySelector('.profile__image')
const editButton = profile.querySelector('.profile__edit-button');
const addPlaceButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.querySelector('.popup__input.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input.popup__input_type_description');
const formAddCard = document.forms['new-place'];
const nameInputPlace = formAddCard.querySelector('.popup__input.popup__input_type_card-name');
const linkInput = formAddCard.querySelector('.popup__input.popup__input_type_url');
const popupOpenImage = document.querySelector('.popup.popup_type_image');
const imgInPopup = popupOpenImage.querySelector('.popup__image');
const namePlace = popupOpenImage.querySelector('.popup__caption');

const callbacks = {
  deleteCallback: deleteCard,
  likeCallback: likeCard,
  openImgCallbak: openImg
};

const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_state_invalid",
};

function openImg(sectionImg) {
  sectionImg.addEventListener('click', () => {         
    imgInPopup.src = sectionImg.src;
    imgInPopup.alt = sectionImg.alt;
    namePlace.textContent = imgInPopup.alt.split(" ― ").pop();
    openPopup(popupOpenImage);
  });
}

function renderCard(newCard, method = 'prepend') {
  const result = createCard(newCard, callbacks);
  placesList[method](result);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  updateProfileData({
    nameInput: nameInput.value,
    aboutInput: jobInput.value
  })
    .then((response) => {
      profileTitle.textContent = response.name;
      profileDescription.textContent = response.about;
    })
  closePopup(popupEdit);
}

function handleFormAddPlaceSubmit(evt) {
  evt.preventDefault();
  addNewCard({
    namePlaceInput: nameInputPlace.value,
    linkInput:  linkInput.value
  })
  .then((response) => {
    renderCard(response)
  })
  closePopup(popupAddCard);
  evt.target.reset();
  clearValidation(formAddCard,configForm);
}

popups.forEach( (item) => {
  item.classList.add('popup_is-animated');
});

setCloseModalHandlers(popups);
enableValidation(configForm);

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEdit, configForm);
  openPopup(popupEdit);
});

addPlaceButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

formEdit.addEventListener('submit', handleFormEditSubmit);
formAddCard.addEventListener('submit', handleFormAddPlaceSubmit);

Promise.all([fetchResponseMethodGet('users/me'), fetchResponseMethodGet('cards')])
  .then(([res1,  res2]) => {
    return Promise.all([res1.json(), res2.json()]);
  })
  .then(([responseForUser, responseforInitCards]) => {
    profileTitle.textContent = responseForUser.name;
    profileImage.src = responseForUser.avatar;
    profileDescription.textContent = responseForUser.about;

    responseforInitCards.forEach((card) => {
      renderCard(card);
    })
  })






