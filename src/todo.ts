import {
  openTodoList,
  addTodoBtn,
  todoList,
  todoInput,
  newTaskBtn,
  closeBtn,
  addNewTask,
  todosDiv,
  todoOpen,
} from './selectors';
import { v4 as uuid } from 'uuid';

let todos: {
  content: string;
  uuid: string;
  completed: boolean;
}[] = [
  {
    content: 'write your first todo',
    uuid: uuid(),
    completed: false,
  },
];
//render elements to todolist
function renderTodo(): void {
  if (localStorage.getItem('todos')) {
    const storedTodos = localStorage.getItem('todos')!;
    todos = JSON.parse(storedTodos);
  }
  todoList.innerHTML = todos
    .map((todo) => {
      return ` <li class="todo-element" >
        
      <input type="checkbox"   ${todo.completed ? 'checked' : ''} data-uuid="${
        todo.uuid
      }" />
      <p>${todo.content} </p>
      <button id=${
        todo.uuid
      } class="delete-btn"><span class="pointer" ><i class="fa-regular fa-trash-can"></i></span></button>
  
    </li>`;
    })
    .join('');
}

export function initTodos(): void {
  addTodoBtn.addEventListener('click', function (): void {
    const todo: string = todoInput.value;
    todos.push({
      content: todo,
      uuid: uuid(),
      completed: false,
    });
    todoInput.value = '';
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodo();
  });

  renderTodo();

  newTaskBtn.addEventListener('click', function (): void {
    addNewTask.classList.toggle('hidden');
    newTaskBtn.textContent =
      newTaskBtn.textContent === 'New task' ? 'Hide' : 'New task';
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
  todoList.addEventListener('click', function (e: Event): void {
    const target = e.target as HTMLButtonElement;

    if (target.id) {
      const newTodos = todos.filter((todo) => todo.uuid !== target.id);
      todos = newTodos;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodo();
    } else if (target.dataset.uuid) {
      const newTodos = todos.map((todo) => {
        if (todo.uuid === target.dataset.uuid) {
          todo.completed = !todo.completed;
          return todo;
        } else {
          return todo;
        }
      });
      todos = newTodos;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodo();
    }
  });
}
