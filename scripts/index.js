import { Card } from './card.js'
import { initialCards } from './cards-array_constants.js'
import { FormValidator } from './validation.js'

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  popupButtonSelector: '.popup__button'
};

const formElement = document.querySelector(settings.formSelector);
const container = document.querySelector('.elements');
const profileButton = document.querySelector('.profile__edit-button');
const placeButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup-profile');
const placePopup = document.querySelector('.popup-place');
const imagePopup = document.querySelector('.popup-image');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formProfile = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const formPlaceElement = document.querySelector('.popup-place__container');
const placeInputName = document.getElementById('place-name');
const placeInputLink = document.getElementById('place-link');
const formPlace = document.forms.place_edit;
const placePopupSubmit = document.getElementById('button-place');
const imagePopupData = document.querySelector('.popup-image__image');
const popupImgTitle = document.querySelector('.popup-image__title');
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup)
    }
  })
})

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup)
      }
    });
  };
};

const createCard = (name, link, templateSelector) => {
  const card = new Card(name, link, templateSelector, openCard);
  const cardElement = card.generateCard();
  return cardElement;
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

function openPopupPlace() {
  openPopup(placePopup);
  const validator = new FormValidator(settings, placePopup)
  validator.enableValidation();
  validator.hidePopupErrors()
  formPlace.reset();
  validator.deactivateButton();
};

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(profilePopup);
  const validator = new FormValidator(settings, profilePopup)
  validator.enableValidation();
  validator.hidePopupErrors()
};

function openCard(name, link) {
  imagePopupData.src = link;
  imagePopupData.alt = name;
  popupImgTitle.textContent = name;
  openPopup(imagePopup)
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileAbout.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(profilePopup);
};

const handleAddBtn = (evt) => {
  evt.preventDefault();
  container.prepend(createCard(placeInputName.value, placeInputLink.value, '.card-template_type_default'));
  closePopup(placePopup);
};

initialCards.forEach((item) => {
  container.append(createCard(item.name, item.link, '.card-template_type_default'));
});

formPlaceElement.addEventListener('submit', handleAddBtn);
profileButton.addEventListener('click', openPopupProfile);
placeButton.addEventListener('click', openPopupPlace);
formProfile.addEventListener('submit', submitFormProfile);
