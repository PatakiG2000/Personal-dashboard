import { v4 as uuid } from 'uuid';

const html = document.querySelector('html') as HTMLHtmlElement;
const body = document.querySelector('body') as HTMLBodyElement;
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
const bookMarkList = document.querySelector(
  '.bookmark-list',
) as HTMLOListElement;

const weatherContainer = document.querySelector('.weather') as HTMLDivElement;

const bookmarkTitleInput = document.getElementById(
  'sitename',
) as HTMLInputElement;
const bookmarkUrlInput = document.getElementById('siteurl') as HTMLInputElement;
const addBookmarkBtn = document.querySelector(
  '.add-bookmark',
) as HTMLButtonElement;
const stockList = document.querySelector('.stock-list') as HTMLUListElement;

//stickynotes
const stickyForm = document.querySelector('.sticky-form');
const addStickyNoteBtn = document.querySelector(
  '.add-sticky-btn',
) as HTMLButtonElement;
const createStickyButton = document.querySelector(
  '#createsticky',
) as HTMLButtonElement;

const stickyTitleInput = document.querySelector(
  '#stickytitle',
) as HTMLInputElement;
const stickyTextInput = document.querySelector(
  '#stickytext',
) as HTMLInputElement;

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
      <img src="https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png" alt="weather icon" />
    <p>${(data.main.temp - 272.15).toFixed(1)}&#8451 </p>
          <p>${data.name} </p>
          <p>${data.weather[0].description}</p>
          <p>${(data.main.temp_min - 272.15).toFixed(1)}&#8451 </p>
          <p>${(data.main.temp_max - 272.15).toFixed(1)}&#8451</p>
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

//bookmark elements
let bookmarks: {
  uuid: string;
  url: string;
  name: string;
}[] = [
  {
    uuid: uuid(),
    url: 'https://fontawesome.com/icons/x?f=classic&s=solid&an=spin',
    name: 'Fontawesome',
  },
];

//rendering bookmarks
function renderBookmarks(): void {
  if (localStorage.getItem('bookmarks')) {
    const storedBookmarks = localStorage.getItem('bookmarks')!;
    bookmarks = JSON.parse(storedBookmarks);
  }
  bookMarkList.innerHTML = bookmarks
    .map((bookmark) => {
      return `   <li>
      <a href=${bookmark.url} target="_blank"
        >${bookmark.name} </a
      >
      <button id=${bookmark.uuid} >Delete</button>
    </li>`;
    })
    .join('');
}

//adding new bookmark
function newBookmark(): void {
  if (bookmarkTitleInput.value && bookmarkUrlInput.value) {
    bookmarks.push({
      uuid: uuid(),
      url: bookmarkUrlInput.value,
      name: bookmarkTitleInput.value,
    });
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
}

//deleting bookmark
function deleteBookmark(id: string): void {
  const newBookmarks = bookmarks.filter((bookmark) => {
    return bookmark.uuid !== id;
  });
  bookmarks = newBookmarks;
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
}

//handling delete button
bookMarkList.addEventListener('click', function (e: Event): void {
  const target = e.target as HTMLButtonElement;
  deleteBookmark(target.id);
});
addBookmarkBtn.addEventListener('click', newBookmark);

renderBookmarks();

//render elements to todolist
function renderTodo(): void {
  if (localStorage.getItem('todos')) {
    const storedTodos = localStorage.getItem('todos')!;
    todos = JSON.parse(storedTodos);
  }
  todoList.innerHTML = todos
    .map((todo) => {
      return ` <li  >
    <input type="checkbox" />
    <p>${todo.content} </p>
    <button id=${todo.uuid} class="delete-btn"><i class="fa-solid fa-x"></i></i></button>

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
  localStorage.setItem('todos', JSON.stringify(todos));
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
todoList.addEventListener('click', function (e: Event): void {
  const target = e.target as HTMLButtonElement;
  const newTodos = todos.filter((todo) => todo.uuid !== target.id);
  todos = newTodos;
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodo();
});

//getting  stock prices
const tickers: [string, string] = ['BTC', 'ETH'];

tickers.forEach((ticker) => {
  let options = {
    method: 'GET',
    headers: { 'x-api-key': 'daZHlf4Dw1mex44HsXAWPw==H5QkzNXhD5cBEaoP' },
  };

  let url = `https://api.api-ninjas.com/v1/cryptoprice?symbol=${ticker}`;

  fetch(url, options)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
});

//added the match random to the end so every link will be different thus the background changes
function change(): void {
  const url = `https://picsum.photos/1920/1280/?blur/${Math.random()}`;
  html.style.background = `url(${url})`;
}

//changing background
setInterval(() => {
  change();
  html.style.backgroundRepeat = 'no-repeat';
  html.style.backgroundSize = 'cover';
}, 300000);

//sticky notes
addStickyNoteBtn.addEventListener('click', function (): void {
  stickyForm?.classList.toggle('hidden');
});

const deleteSticky = (e: Event): void => {
  const target = e.target as Element;
  if (target.parentNode) {
    const parentNode = target.parentNode as unknown as ChildNode;
    console.log(parentNode.id);
    const newStickies = stickyNotes.filter(
      (sticky) => sticky.uuid !== parentNode.id,
    );
    stickyNotes = newStickies;
    saveStickies();
    parentNode.remove();
  }
};

let isDragging = false;
let dragTarget: any;

let lastOffsetX = 0;
let lastOffsetY = 0;

function drag(e: MouseEvent) {
  if (!isDragging) return;

  // console.log(lastOffsetX);

  dragTarget.style.left = e.clientX - lastOffsetX + 'px';
  dragTarget.style.top = e.clientY - lastOffsetY + 'px';
}

let stickyNotes: {
  title: string;
  content: string;
  uuid: string;
  style: string;
}[];

function createSticky(): void {
  const newSticky = document.createElement('div');
  const stickyId = uuid();
  newSticky.id = stickyId;
  const html = `<h3>${stickyTitleInput.value.replace(
    /<\/?[^>]+(>|$)/g,
    '',
  )}</h3><p>${stickyTextInput.value
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(
      /\r\n|\r|\n/g,
      '<br />',
    )}</p><span class="deletesticky">&times;</span>`;
  newSticky.classList.add('drag', 'sticky');
  newSticky.innerHTML = html;
  //newSticky.style.backgroundColor = randomColor();
  stickyNotes.push({
    title: stickyTitleInput.value,
    content: stickyTextInput.value,
    uuid: stickyId,
    style: '',
  });
  body.append(newSticky);
  positionSticky(newSticky);
  applyDeleteListener();
  clearStickyForm();
  saveStickies();
  stickyForm?.classList.toggle('hidden');
}
function clearStickyForm() {
  stickyTitleInput.value = '';
  stickyTextInput.value = '';
}
function positionSticky(sticky: HTMLDivElement) {
  sticky.style.left =
    window.innerWidth / 2 -
    sticky.clientWidth / 2 +
    (-100 + Math.round(Math.random() * 50)) +
    'px';
  sticky.style.top =
    window.innerHeight / 2 -
    sticky.clientHeight / 2 +
    (-100 + Math.round(Math.random() * 50)) +
    'px';
}

function applyDeleteListener() {
  let deleteStickyButtons = document.querySelectorAll('.deletesticky');
  deleteStickyButtons.forEach((dsb) => {
    dsb.removeEventListener('click', deleteSticky, false);
    dsb.addEventListener('click', deleteSticky);
  });
}

//Rendering stored stickies
function renderStickies(): void {
  const storedStickies = localStorage.getItem('stickies')!;
  stickyNotes = JSON.parse(storedStickies);
  console.log(stickyNotes);
  if (storedStickies) {
    stickyNotes.forEach((sticky) => {
      let newSticky = document.createElement('div') as HTMLDivElement;
      newSticky.id = sticky.uuid;

      const html = `<h3>${sticky.title.replace(
        /<\/?[^>]+(>|$)/g,
        '',
      )}</h3><p>${sticky.content
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(
          /\r\n|\r|\n/g,
          '<br />',
        )}</p><span class="deletesticky">&times;</span>`;
      newSticky.classList.add('drag', 'sticky');
      newSticky.innerHTML = html;
      newSticky.style.left = sticky.style.left;
      newSticky.style.top = sticky.style.top;
      newSticky.style.bottom = sticky.style.bottom;
      newSticky.style.right = sticky.style.right;
      body.append(newSticky);
      console.log(sticky.style);
      applyDeleteListener();
    });
  }
}

//saving stickies to localstorage
function saveStickies(): void {
  localStorage.setItem('stickies', JSON.stringify(stickyNotes));
}

//Saving the stlye with timeout so it gets the correct position
window.addEventListener('mousedown', (e: MouseEvent) => {
  const target = e.target as Element;
  if (!target.classList.contains('drag')) {
    return;
  }
  dragTarget = e.target;
  dragTarget.parentNode.append(dragTarget);
  lastOffsetX = e.offsetX;
  lastOffsetY = e.offsetY;
  // console.log(lastOffsetX, lastOffsetY);
  isDragging = true;
  setTimeout(() => {
    stickyNotes.forEach((sticky) => {
      if (sticky.uuid === target.id) {
        sticky.style = dragTarget.style;
      }
      saveStickies();
    });
  }, 400);
});
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', () => (isDragging = false));

createStickyButton.addEventListener('click', createSticky);
applyDeleteListener();
renderStickies();
