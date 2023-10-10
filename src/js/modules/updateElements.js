export function updateElements(userdata) {
  header(userdata);
}

function header(userdata) {
  const iconDef = document.querySelector('[data-user="iconDefault"]');
  const iconUser = document.querySelector('[data-user="iconUser"]');
  const noauthBlock = document.querySelector('[data-user="noauthBlock"]');
  const authBlock = document.querySelector('[data-user="authBlock"]');
  if (userdata.authorized) {
    iconDef.classList.remove('_active');
    iconUser.classList.add('_active');
    authBlock.classList.add('_active');
    noauthBlock.classList.remove('_active');
    const fChar = userdata.fname[0].toUpperCase();
    const lChar = userdata.lname[0].toUpperCase();
    iconUser.textContent = fChar + lChar;
  } else {
    iconDef.classList.add('_active');
    iconUser.classList.remove('_active');
    authBlock.classList.remove('_active');
    noauthBlock.classList.add('_active');
  }
}