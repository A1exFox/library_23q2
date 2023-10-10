import { storage } from "./storage";

const DATA_USER = '[data-user]';
const CSS_ACTIVE = '_active';

const dataElements = document.querySelectorAll(DATA_USER);
const elements = getElements(dataElements, 'user');

export function clickDocument(event) {
  if (!elements) return;
  clickBurger(event);
  clickProfile(event);
  clickLogin(event);
  clickRegister(event);
  clickCloseModal(event);
  clickLogout(event);
}

function clickLogout(event) {
  if (event.target != elements.logoutUser) return;
  const userdata = storage.get();
  userdata.authorized = false;
  storage.setUpdate(userdata);
}

function clickCloseModal(event) {
  if (event.target != closeModal) return;
  closePopup();
}

export function closePopup() {
  modalWindow.classList.remove(CSS_ACTIVE);
}

function clickLogin(event) {
  const isSignInBtn1 = event.target == elements.loginButton;
  const isSignInBtn2 = event.target == loginButton2;
  if (!isSignInBtn1 && !isSignInBtn2) return;
  loginBody.classList.add(CSS_ACTIVE);
  registerBody.classList.remove(CSS_ACTIVE);
  modalAuth.classList.add(CSS_ACTIVE);
  modalWindow.classList.add(CSS_ACTIVE);
}
function clickRegister(event) {
  const isSignUpBtn1 = event.target == elements.registerButton;
  const isSignUpBtn2 = event.target == registerButton2;
  if (!isSignUpBtn1 && !isSignUpBtn2) return;
  loginBody.classList.remove(CSS_ACTIVE);
  registerBody.classList.add(CSS_ACTIVE);
  modalAuth.classList.add(CSS_ACTIVE);
  modalWindow.classList.add(CSS_ACTIVE);
}

function clickProfile(event) {
  const isActive = elements.spollerUser.classList.contains(CSS_ACTIVE);
  const clickInTrigger = event.target.closest('[data-user="buttonUser"]');
  if (isActive) {
    elements.spollerUser.classList.remove(CSS_ACTIVE);
  } else if (clickInTrigger) {
    elements.spollerUser.classList.add(CSS_ACTIVE);
  }
}
function clickBurger(event) {
  const isActive = elements.buttonBurger.classList.contains(CSS_ACTIVE);
  const dataUser = event.target.closest(DATA_USER);
  const isTrigger = dataUser == elements.buttonBurger;
  if (!isActive && isTrigger) {
    elements.buttonBurger.classList.add(CSS_ACTIVE);
    elements.menuBurger.classList.add(CSS_ACTIVE);
  } else {
    if (event.target.dataset.ignore == 'burger') return;
    elements.buttonBurger.classList.remove(CSS_ACTIVE);
    elements.menuBurger.classList.remove(CSS_ACTIVE);
  }
}
function getElements(elements, name) {
  if (!elements) return null;
  const result = {};
  for (const element of elements) {
    const data = element.dataset[name];
    if (!data) continue;
    if (!(data in result)) {
      result[data] = element;
      continue;
    }
    if (data in result && !Array.isArray(result[data])) {
      result[data] = [result[data], element];
      continue;
    }
    result[data].push(element);
  }
  return result;
}