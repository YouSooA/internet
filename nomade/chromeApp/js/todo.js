const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'toDos';

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const deleteTarget = event.target.parentElement;
  deleteTarget.remove();
  // to do 삭제
  toDos = toDos.filter((toDos) => toDos.id !== parseInt(deleteTarget.id));
  // 삭제된 to do 업데이트
  saveToDos();
}

function showToDos(newToDoObject) {
  const toDo = document.createElement('li');
  const toDoContent = document.createElement('span');
  const deleteButton = document.createElement('button');
  toDo.id = newToDoObject.id;
  toDoContent.innerText = newToDoObject.content;
  deleteButton.innerText = 'Delete';

  toDo.appendChild(toDoContent);
  toDo.appendChild(deleteButton);
  toDoList.appendChild(toDo);

  deleteButton.addEventListener('click', deleteToDo);
}

function toDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = '';
  const newToDoObject = {
    id: Date.now(),
    content: newToDo,
  };
  toDos.push(newToDoObject);
  showToDos(newToDoObject);
  saveToDos();
}

toDoForm.addEventListener('submit', toDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  parsedToDos.forEach(showToDos);
}
