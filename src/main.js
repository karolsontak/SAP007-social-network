import feed from './pages/feed/feed.js';
import login from './pages/login/login.js';
import register from './pages/register/register.js';
import about from './pages/about/about.js';
import { stayLoggedIn } from "/firebase.js";

const container = document.querySelector('#root')

const redirect = () => {
  container.innerHTML = ''; 
  switch (window.location.hash) {
    case '#login':
      stayLoggedIn((loggedIn) => {
        if (loggedIn) {
          container.appendChild(feed());
        } else {
          container.appendChild(login());
        }
      }) 
      break;
    case '#register':
      container.appendChild(register());
      break;
    case '#feed':
      stayLoggedIn((loggedIn) => {
        if (loggedIn) {
          container.appendChild(feed());
        } else {
          container.appendChild(login());
        }
      }) 
      break;
    case '#about':
      stayLoggedIn((loggedIn) => {
        if (loggedIn) {
          container.appendChild(about());
        } else {
          container.appendChild(login());
        }
      }) 
      break;
    default:
      container.appendChild(login());
  };
}

const init = () => {
  window.addEventListener('hashchange', () => {
    redirect();
  });
}

window.addEventListener('load', () => {
  redirect();
  init();
})