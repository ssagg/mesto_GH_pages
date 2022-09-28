let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__about');
let saveButton = document.querySelector('.popup__button-submit');

function showClick() {
  popup.classList.add('popup_enabled');
}

function closePopup() {
  popup.classList.remove('popup_enabled');  
}

editButton.addEventListener('click', showClick);
popupClose.addEventListener('click', closePopup);
saveButton.addEventListener('click', closePopup);

nameInput.value = profileName.textContent;
jobInput.value = profileAbout.textContent;  

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileAbout.textContent = jobInput.value;  
    profileName.textContent = nameInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
