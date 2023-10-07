import { checkBurger } from "./modules/burger";

document.addEventListener('click', clickDocument);
function clickDocument(event) {
  checkBurger(event.target);
}