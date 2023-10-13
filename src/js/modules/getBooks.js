import { updateElements } from "./updateElements";
export let books;

(async function () {
  try {
    const response = await fetch('./files/books.json');
    const json = await response.json();
    books = new Map(json);
    updateElements();
  }
  catch (error) {
    console.error(error);
  }
})();