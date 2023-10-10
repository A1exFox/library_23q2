import { storage } from "./storage";
import { closePopup } from "./clickDocument";

export function submitForm(event) {
  event.preventDefault();
  if (event.target.name == 'signup') {
    if (event.target.elements.pass.value.length < 8) return;
    const user = storage.get();
    user.fname = event.target.elements.fname.value;
    user.lname = event.target.elements.lname.value;
    user.email = event.target.elements.email.value;
    user.password = event.target.elements.pass.value;
    user.authorized = true;
    user.countVisit = 1;
    user.cart = getCartNumber();
    storage.setUpdate(user);
    closePopup();
    event.target.elements.fname.value = '';
    event.target.elements.lname.value = '';
    event.target.elements.email.value = '';
    event.target.elements.pass.value = '';
  }
  if (event.target.name == 'signin') {
    const user = storage.get();
    const element = event.target.elements;
    const login = element.login.value == user.email || element.login.value == user.cart;
    const password = element.password.value == user.password;
    if (!login || !password) return;
    user.authorized = true;
    storage.setUpdate(user);
    closePopup();
    element.login.value = '';
    element.password.value = '';
  }
}

function getCartNumber() {
  let str16 = '';
  while (str16.length < 9) {
    str16 += getRandom().toString(16);
  }
  return str16.toUpperCase();
}

function getRandom() {
  return Math.floor(Math.random() * 16);
}