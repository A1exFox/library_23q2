const elements = document.querySelectorAll('[data-about-button]') || [];

(function about() {
  const resolutions = ['1430', '1060'];
  for (const resolution of resolutions) {
    const matchMedia = window.matchMedia(`(max-width: ${resolution}px)`);
    matchMedia.addEventListener('change', changeResolution);
  }
  setSlide(elements[0]);
  updateSideButtons();
})();

export function clickSlider(event) {
  const button = event.target.closest('.about__button');
  const sideButton = event.target.closest('.about__side-button');
  if (button) changeOffset(button);
  if (sideButton) changeSideButtons(sideButton);
  updateSideButtons();
}

function changeSideButtons(button) {
  if (button == aboutSideLeft) setSlide(elements[getActiveSlideID() - 1]);
  if (button == aboutSideRight) setSlide(elements[getActiveSlideID() + 1]);
}

function updateSideButtons() {
  let maxIndex = 4;
  if (window.innerWidth > 1060) maxIndex = 3;
  if (window.innerWidth > 1430) maxIndex = 2;
  aboutSideLeft.disabled = elements[0].disabled;
  aboutSideRight.disabled = elements[maxIndex].disabled;
}

function changeResolution() {
  if (window.innerWidth > 1060 && elements[4].disabled) {
    setSlide(elements[3]);
  }
  if (window.innerWidth > 1430 && elements[3].disabled) {
    setSlide(elements[2]);
  }
  updateSideButtons();
}

function changeOffset(button) {
  let current;
  let last;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] == button) current = i;
    if (elements[i].disabled) last = i;
  }
  let next;
  if (current > last) next = last + 1;
  if (current < last) next = last - 1;
  if (next == undefined) return;
  setSlide(elements[next]);
}

function getActiveSlideID() {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].disabled) return i;
  }
}

function setSlide(button) {
  const dataChange = button.dataset.aboutButton;
  for (const element of elements) {
    element.disabled = false;
    const offset = element.dataset.aboutButton;
    aboutSlider.classList.remove(`_offset${offset}`);
  }
  button.disabled = true;
  aboutSlider.classList.add(`_offset${dataChange}`);
}
