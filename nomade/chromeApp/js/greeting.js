const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const linkClick = document.querySelector('a');
const greeting = document.querySelector('#greeting');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  // username 저장
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintingGreetings(username);
}
// username 출력
function paintingGreetings(username) {
  greeting.innerText = `hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

function goToSite(event) {
  alert('노마드 코더 강의로 넘어간다!')
  console.dir(event);
}

linkClick.addEventListener('click', goToSite);

const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername === null) {
  // localStorage에 저장된 username 키가 없다면
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  // localStorage에 저장된 username 키가 있다면
  loginForm.classList.add(HIDDEN_CLASSNAME);
  paintingGreetings(savedUsername);
}