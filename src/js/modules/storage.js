import { updateElements } from "./updateElements";

export const storage = {
  get, set, setUpdate,
};


(function initLibraryData() {
  const data = read();
  if (data) {
    updateElements(get());
    return;
  }
  const obj = {};
  // const obj = { fname: 'Alex', lname: 'Fox' };
  const str = JSON.stringify(obj);
  write(str);
  updateElements(get());
})();

function setUpdate(object) {
  set(object);
  updateElements(object);
}

function set(object) {
  if (!object) return;
  write(JSON.stringify(object));
}
function get() {
  return JSON.parse(read());
}
function write(data) {
  localStorage.setItem('libraryData', data);
}
function read() {
  return localStorage.getItem('libraryData');
}