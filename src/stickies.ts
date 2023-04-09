import {
  stickyForm,
  addStickyNoteBtn,
  createStickyButton,
  stickyTitleInput,
  stickyTextInput,
  closeStickyBtn,
  body,
} from './selectors';
import { v4 as uuid } from 'uuid';

let stickyNotes: {
  title: string;
  content: string;
  uuid: string;
  style: {
    left?: string | undefined;
    top?: string | undefined;
    right?: string | undefined;
    bottom?: string | undefined;
  };
}[];

let isDragging = false;
let dragTarget: any;

let lastOffsetX = 0;
let lastOffsetY = 0;

export function initStickies(): void {
  //sticky notes
  addStickyNoteBtn.addEventListener('click', function (): void {
    stickyForm?.classList.toggle('hidden');
  });

  closeStickyBtn.addEventListener('click', function (): void {
    stickyForm?.classList.toggle('hidden');
  });

  window.addEventListener('mousedown', (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.classList.contains('drag')) {
      return;
    }
    dragTarget = e.target;
    dragTarget.parentNode.append(dragTarget);
    lastOffsetX = e.offsetX;
    lastOffsetY = e.offsetY;
    isDragging = true;
  });
  window.addEventListener('mousemove', drag);

  //Saving the stlye
  window.addEventListener('mouseup', (e: MouseEvent) => {
    const target = e.target as Element;
    isDragging = false;
    stickyNotes.forEach((sticky) => {
      if (sticky.uuid === target.id) {
        sticky.style = dragTarget.style;
      }
      saveStickies();
    });
  });

  createStickyButton.addEventListener('click', createSticky);
  applyDeleteListener();
  renderStickies();
}

const deleteSticky = (e: Event): void => {
  const target = e.target as Element;
  if (target.parentNode) {
    const parentNode = target.parentNode as Element;
    console.log(parentNode.id);
    const newStickies = stickyNotes.filter(
      (sticky) => sticky.uuid !== parentNode.id,
    );
    stickyNotes = newStickies;
    saveStickies();
    parentNode.remove();
  }
};

function drag(e: MouseEvent) {
  if (!isDragging) return;

  // console.log(lastOffsetX);

  dragTarget.style.left = e.clientX - lastOffsetX + 'px';
  dragTarget.style.top = e.clientY - lastOffsetY + 'px';
}

function createSticky(): void {
  const newSticky = document.createElement('div');
  const stickyId = uuid();
  newSticky.id = stickyId;
  const html = `<h3>${stickyTitleInput.value.replace(
    /<\/?[^>]+(>|$)/g,
    '',
  )}</h3><p class="sticky-text">${stickyTextInput.value
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
    style: {
      left: '',
      top: '',
      right: '',
      bottom: '',
    },
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
      newSticky.style.left = sticky.style.left ?? '0';
      newSticky.style.top = sticky.style.top ?? '0';
      newSticky.style.bottom = sticky.style.bottom ?? '0';
      newSticky.style.right = sticky.style.right ?? '0';
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
