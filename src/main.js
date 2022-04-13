import feed from './Pages/feed/feed.js';
import login from './Pages/login/login.js';
import register from './Pages/register/register.js';

const container = document.querySelector('#root');

// SINGLE PAGE APLICATION
const redirect = () => {
  document.querySelector('#root').innerHTML = ''; 
  switch (window.location.hash) {
    case '#login':
      container.appendChild(login());
      break;
    case '#register':
      container.appendChild(register());
      break;
    case '#feed':
      container.appendChild(feed());
      break;
    default:
      container.appendChild(login());
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
