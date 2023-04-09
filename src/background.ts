import { html, quoteParagraph, time } from './selectors.ts';

export function initBackground(): void {
  //getting quote
  fetch('https://api.quotable.io/random?tags=technology,famous-quotes')
    .then((res) => res.json())
    .then((data) => {
      quoteParagraph.textContent = data.content;
    });

  setInterval(() => {
    time.textContent = new Date().toLocaleTimeString();
  }, 1000);

  //changing background
  setInterval(() => {
    change();
    html.style.backgroundRepeat = 'no-repeat';
    html.style.backgroundSize = 'cover';
  }, 900000);
}

//added the match random to the end so every link will be different thus the background changes
function change(): void {
  const url = `https://picsum.photos/1920/1280/?blur/${Math.random()}`;
  html.style.background = `url(${url})`;
  console.log('Background provided by picsum//unsplash:', url);
}
