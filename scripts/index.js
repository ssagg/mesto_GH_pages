const container = document.querySelector('.elements');
const template = document.querySelector('.template');

const profileButton = document.querySelector('.profile__edit-button');
const placeButton = document.querySelector('.profile__add-button');

const profilePopup = document.getElementById('popup-edit');
const placePopup = document.getElementById('popup-add')
const imagePopup = document.getElementById('popup-image');

const popupClose = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formProfile = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const popupPlaceClose = document.querySelector('.popup-place__button-close');
const formPlaceElement = document.querySelector('.popup-place__container');
const placeInputName = document.getElementById('place-name');
const placeInputLink = document.getElementById('place-link')
const formPlace= document.forms.place_edit;

const imagePopupData = document.querySelector('.popup-image__image')
const popupImgClose = document.querySelector('.popup-image__button-close');
const popupImgTitle = document.querySelector('.popup-image__title')
const delBtn = document.querySelector('.card__delete');
const likeBtn = document.querySelector('.card__icon');

function openPopup(popup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileAbout.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(profilePopup);
};

const render = () => {
  initialCards.forEach((item) => {
    const currentItem = createItemNode(item.name, item.link);
    container.append(currentItem);
  });
  formPlaceElement.addEventListener('submit', handleAddBtn);
};

const createItemNode = (name, link) => {
  const currentItem = template.content.cloneNode(true);
  const cardImage = currentItem.querySelector('.card__image');
  const cardName = currentItem.querySelector('.card__title');
  const cardLike = currentItem.querySelector('.card__icon');
  const delButton = currentItem.querySelector('.card__delete');
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  cardLike.addEventListener('click', handleLikeBtn);
  delButton.addEventListener('click', handleDelBtn);
  cardImage.addEventListener('click', ()=> {
    imagePopupData.src = cardImage.src;
    imagePopupData.alt = cardImage.alt;
    popupImgTitle.textContent = cardName.textContent;
    openPopup(imagePopup);
  });

  return currentItem;
};

const handleAddBtn = (evt) => {
  evt.preventDefault();
  const item = createItemNode(placeInputName.value, placeInputLink.value);
  formPlace.reset();
  container.prepend(item);
  closePopup(placePopup);
};

const handleDelBtn = (evt) => {
  const cardEl = evt.target.closest('.card');
  cardEl.remove();
};

const handleLikeBtn = (evt) => {
  evt.target.classList.toggle('card__icon_active');
};

profileButton.addEventListener('click', () => { openPopup(profilePopup) });
placeButton.addEventListener('click', () => { openPopup(placePopup) });
formProfile.addEventListener('submit', submitFormProfile);
popupClose.addEventListener('click', () => { closePopup(profilePopup) });
popupPlaceClose.addEventListener('click', () => { closePopup(placePopup) });
popupImgClose.addEventListener('click', () => { closePopup(imagePopup) });

render();