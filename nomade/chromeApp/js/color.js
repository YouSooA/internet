const hello = document.querySelector('.hello');

function handleHelloClicked() {
  hello.classList.toggle('clicked');
}

hello.addEventListener('click', handleHelloClicked);