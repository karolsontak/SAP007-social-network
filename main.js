import feed from './pages/feed/index.js';
import home from './pages/home/index.js';
import register from './pages/register/index.js';

const container = document.querySelector('#root');

// SINGLE PAGE APLICATION
const redirect = () => {
  document.querySelector('#root').innerHTML = ''; 
  switch (window.location.hash) {
    case '#home':
      container.appendChild(home());
      break;
    case '#register':
      container.appendChild(register());
      break;
    case '#feed':
      container.appendChild(feed());
      break;
    default:
      container.appendChild(home());
  };
};

const init = () => {
  window.addEventListener('hashchange', () => {
    redirect();
  });
}

window.addEventListener('load', () => {
  redirect();
  init();
});

// document.addEventListener('DOMContentLoaded', () => {
//   const loadEl = document.querySelector('#root');

//   try {
//     getApp();
//     getAuth().onAuthStateChanged((user) => {
//       if (user) {
//         window.location.hash = 'feed';
//       }
//     });
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.error(e);
//     loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
//   }
// })
