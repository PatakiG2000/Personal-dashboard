import { v4 as uuid } from 'uuid';

const quoteParagraph = document.querySelector('.quote') as HTMLParagraphElement;
const openTodoList = document.querySelector(
  '.todo-button',
) as HTMLButtonElement;
const addTodoBtn = document.querySelector('.add-todo-btn') as HTMLButtonElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;
const todoInput = document.querySelector('.todo-input') as HTMLTextAreaElement;
const newTaskBtn = document.querySelector('.new-task-btn') as HTMLButtonElement;
const closeBtn = document.querySelector('.close') as HTMLButtonElement;
const addNewTask = document.querySelector('.new-task-div') as HTMLDivElement;
const todosDiv = document.querySelector('.todos') as HTMLDivElement;
const todoOpen = document.querySelector('.todo-button') as HTMLButtonElement;
const time = document.querySelector('.time') as HTMLHeadingElement;

const weatherContainer = document.querySelector('.weather') as HTMLDivElement;

//get users location and fetch weather data
navigator.geolocation.getCurrentPosition((pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=feb00505bb1f18c6a87d08f4d0e94fef
    `,
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      weatherContainer.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
    <p>${data.main.temp} </p>
          <p>${data.name} </p>
          <p>${data.weather[0].description}</p>
          <p>${data.main.temp_min} </p>
          <p>${data.main.temp_max}</p>
          <p>${data.wind.speed}</p>
    `;
    });
});

//getting quote
fetch('https://api.quotable.io/random?tags=technology,famous-quotes')
  .then((res) => res.json())
  .then((data) => {
    quoteParagraph.textContent = data.content;
  });

setInterval(() => {
  time.textContent = new Date().toLocaleTimeString();
}, 1000);

let todos: {
  content: string;
  uuid: string;
}[] = [
  {
    content: 'write your first todo',
    uuid: uuid(),
  },
];

//render elements to todolist
function renderTodo(): void {
  todoList.innerHTML = todos
    .map((todo) => {
      return ` <li  >
    <input type="checkbox" />
    <p>${todo.content} </p>
    <button id=${todo.uuid} class="delete-btn">del</button>

  </li>`;
    })
    .join('');
}

//todo button
addTodoBtn.addEventListener('click', function (): void {
  const todo: string = todoInput.value;
  todos.push({
    content: todo,
    uuid: uuid(),
  });
  todoInput.value = '';
  renderTodo();
});

renderTodo();

newTaskBtn.addEventListener('click', function (): void {
  addNewTask.classList.toggle('hidden');
});

closeBtn.addEventListener('click', function (): void {
  todoOpen.classList.toggle('hidden');
  todosDiv.classList.toggle('hidden');
});

todoOpen.addEventListener('click', function (): void {
  todoOpen.classList.toggle('hidden');
  todosDiv.classList.toggle('hidden');
});

//delete todos
todoList.addEventListener('click', function (e) {
  const newTodos = todos.filter((todo) => todo.uuid !== e.target?.id);
  todos = newTodos;
  renderTodo();
});
