import { storage } from "./storage";
import { removeAllActive } from "./clickDocument";
import { md5 } from "./md5";

export function submitForm(event) {
  event.preventDefault();
  if (event.target.name == 'signup') {
    if (event.target.elements.pass.value.length < 8) return;
    const { fname, lname, email, pass } = event.target.elements;
    const books = Array(2).fill(0).map(() => String(getRandom(0, 15)));
    const user = {
      fname: fname.value,
      lname: lname.value,
      email: email.value.toLowerCase(),
      password: md5(pass.value),
      card: getCardNumber(),
      authorized: true,
      vizits: 1,
      books,
      bonuses: 0,
    }
    storage.setUpdate(user);
    removeAllActive();
    event.target.elements.fname.value = '';
    event.target.elements.lname.value = '';
    event.target.elements.email.value = '';
    event.target.elements.pass.value = '';
  }
  if (event.target.name == 'signin') {
    const user = storage.get();
    const inputLogin = event.target.elements.login.value.toLowerCase();
    const cardLogin = user.card.toLowerCase();
    const isLogin = inputLogin == cardLogin || inputLogin == user.email;
    if (!isLogin) return;
    const inputPassword = md5(event.target.elements.password.value);
    const isPassword = inputPassword == user.password;
    if (!isPassword) return;
    user.authorized = true;
    user.vizits++;
    storage.setUpdate(user);
    removeAllActive();
    event.target.elements.login.value = '';
    event.target.elements.password.value = '';
  }
}


function getCardNumber() {
  const min = 0xffffffff;
  const max = 0xfffffffff;
  const random = getRandom(min, max);
  const cardNumber = random.toString(16).toUpperCase();
  return cardNumber;
}

function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}