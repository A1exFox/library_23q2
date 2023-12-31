import { storage } from "./storage";
import { books } from "./getBooks";
import { inserthtml } from "./html";
import * as about from "./about";

const DATA_USER = '[data-user]';
const CSS_ACTIVE = '_active';

const dataElements = document.querySelectorAll(DATA_USER);
const elements = getElements(dataElements, 'user');
// console.log(elements);

export function clickDocument(event) {
  if (!elements) return;
  clickBurger(event);
  clickProfile(event);
  clickLogin(event);
  clickRegister(event);
  clickLogout(event);
  clickCloseModal(event);
  clickMyProfile(event);
  clickClipboardCard(event);
  about.clickSlider(event);
}

function clickClipboardCard(event) {
  if (!event.target.closest('#clipboardCard')) return;
  const cardNumber = cardNumberProfile.innerHTML;
  if (cardNumber) navigator.clipboard.writeText(cardNumber);
}

function clickMyProfile(event) {
  if (event.target != elements.prifileUser) return;
  const user = storage.get();
  profileInitial.textContent = user.fname[0] + user.lname[0];
  profileFullName.textContent = `${user.fname} ${user.lname}`;
  profileVisits.textContent = user.vizits;
  profileBonuses.textContent = user.bonuses;
  profileBooksCount.textContent = user.books.length;
  listBooksProfile.insertAdjacentHTML('afterbegin', inserthtml(user.books, books));
  cardNumberProfile.textContent = user.card;
  removeAllActive();
  const targets = [profileWindow, modalWindow];
  addActive(targets);
}

function clickLogout(event) {
  if (event.target != elements.logoutUser) return;
  const userdata = storage.get();
  userdata.authorized = false;
  storage.setUpdate(userdata);
}

function clickCloseModal(event) {
  if (event.target != closeAuth && event.target != closeProfile) return;
  removeAllActive();
}

function clickLogin(event) {
  const isSignInBtn1 = event.target == elements.loginButton;
  const isSignInBtn2 = event.target == loginButton2;
  if (!isSignInBtn1 && !isSignInBtn2) return;
  const elemAdd = [loginBody, modalAuth, modalWindow];
  removeAllActive();
  addActive(elemAdd);
}
function clickRegister(event) {
  const isSignUpBtn1 = event.target == elements.registerButton;
  const isSignUpBtn2 = event.target == registerButton2;
  if (!isSignUpBtn1 && !isSignUpBtn2) return;
  const elemAdd = [registerBody, modalAuth, modalWindow];
  removeAllActive();
  addActive(elemAdd);
}

function addActive(elements) {
  if (!elements) return;
  for (const element of elements)
    element.classList.add(CSS_ACTIVE);
}
function removeActive(elements) {
  if (!elements) return;
  for (const element of elements)
    element.classList.remove(CSS_ACTIVE);
}
export function removeAllActive() {
  const elements = [
    modalWindow,
    modalAuth,
    loginBody,
    registerBody,
    profileWindow,
  ];
  removeActive(elements);
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