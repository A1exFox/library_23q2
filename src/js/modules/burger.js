const burgerElements = document.querySelectorAll('[data-menu-burger]');
const ignoreClasses = ['header-menu', 'header-menu__list', 'header-menu__item'];

export function checkBurger(target) {
  if (!burgerElements) return;
  const isBurgerOpen = burgerElements[0].classList.contains('_active');
  if (isBurgerOpen && isNotIgnoreClasses(target)) {
    closeBurger();
    return;
  }
  const burgerItem = target.closest('[data-menu-burger]');
  if (!burgerItem || !burgerItem.dataset.menuBurger) return;
  if (burgerItem.dataset.menuBurger != 'button') return;
  openBurger();
}

function isNotIgnoreClasses(target) {
  for (const iClass of ignoreClasses) {
    if (target.classList.contains(iClass)) return false;
  }
  return true;
}

function openBurger() {
  for (const element of burgerElements)
    element.classList.add('_active');
}

function closeBurger() {
  for (const element of burgerElements)
    element.classList.remove('_active');
}