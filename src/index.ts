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
//getting quote
fetch('https://api.quotable.io/random?tags=technology,famous-quotes')
  .then((res) => res.json())
  .then((data) => {
    quoteParagraph.textContent = data.content;
  });

setInterval(() => {
  time.textContent = new Date().toLocaleTimeString();
}, 1000);

const todos: {
  content: string;
  uuid: string;
}[] = [
  {
    content: 'write your first todo',
    uuid: 'placeholder',
  },
];

//render elements to todot
function renderTodo(): void {
  todoList.innerHTML = todos
    .map((todo) => {
      return ` <li id=${todo.uuid} >
    <input type="checkbox" />
    <p>${todo.content} </p>
    <i>a</i>
  </li>`;
    })
    .join('');
}

addTodoBtn.addEventListener('click', function (): void {
  const todo: string = todoInput.value;
  todos.push({
    content: todo,
    uuid: 'asdasd',
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
