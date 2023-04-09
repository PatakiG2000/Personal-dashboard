import {
  bookMarkList,
  bookmarkTitleInput,
  bookmarkUrlInput,
  addBookmarkBtn,
  bookmarkContainer,
  bookmarkBtn,
} from './selectors';
import { v4 as uuid } from 'uuid';

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

export function initBookmarks(): void {
  bookmarkBtn.addEventListener('click', () => {
    bookmarkContainer.classList.toggle('hidden');
  });
  //handling delete button
  bookMarkList.addEventListener('click', function (e: Event): void {
    const target = e.target as HTMLButtonElement;

    deleteBookmark(target.id);
  });
  addBookmarkBtn.addEventListener('click', newBookmark);

  renderBookmarks();
}
//rendering bookmarks
function renderBookmarks(): void {
  if (localStorage.getItem('bookmarks')) {
    const storedBookmarks = localStorage.getItem('bookmarks')!;
    bookmarks = JSON.parse(storedBookmarks);
  }
  bookMarkList.innerHTML = bookmarks
    .map((bookmark) => {
      return `   <li>
        <a class="bookmark-link" href=${bookmark.url} target="_blank"
          >${bookmark.name} </a
        >
        <button id=${bookmark.uuid}><span class="pointer" ><i class="fa-regular fa-trash-can"></i></span></button>
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
    bookmarkUrlInput.value = '';
    bookmarkTitleInput.value = '';
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
