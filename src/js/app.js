import { clickDocument } from "./modules/clickDocument";

document.addEventListener('click', clickDocument);

document.forms.signin.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(111)
})
