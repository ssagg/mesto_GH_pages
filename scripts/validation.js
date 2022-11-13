
class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._popupButtonSelector = settings.popupButtonSelector;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._popupButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._formInput = this._formElement.querySelector(settings.inputSelector)
  }

  hidePopupErrors = (formElement, settings) => {
    this._inputList.forEach((inputElement) => {
      this._hideError(formElement, inputElement, settings)
    })
    this._toggleButtonState(this._inputList,  settings)
  };

  _showError = (formElement, inputElement, errorMessage) => {
    const formError = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  };

  _hideError = (formElement, inputElement) => {
    const formError = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = "";
  };

  deactivateButton = () => {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  _activateButton = () => {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState = (inputList, buttonElement, settings) => {
    if (this._hasInvalidInput(inputList)) {
      this.deactivateButton(buttonElement, settings);
    } else {
      this._activateButton(buttonElement, settings);
    };
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      this._showError(formElement, inputElement, this._formInput.validationMessage, settings);
    } else {
      this._hideError(formElement, inputElement, settings);
    };
  }

  _setEventListeners = (settings, formElement) => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, settings);
        this._toggleButtonState(this._inputList, settings);
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}

export { FormValidator }