import { clickDocument } from "./modules/clickDocument";
import { submitForm } from "./modules/submitForm";


document.addEventListener('click', clickDocument);
for (const form of document.forms) {
  form.addEventListener('submit', submitForm);
}