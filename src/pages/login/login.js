import {
  signIn,
  signInGoogle,
} from '/firebase.js'; //eslint-disable-line

export default function Login() {
  const login = document.createElement('div');
  login.classList.add('login-box');
  login.innerHTML = `   
      <main class="box">
        <div class="banner">
          <img class="logo" src="../../img/logo.png" alt="Logo" />
          <p class="tittle-banner">LOGIN</p>
        </div>
              
        <form class="login-form">
          <input class="login-input email" type="email" placeholder="E-MAIL" required>
          <input class="login-input password" type="password" placeholder="SENHA" required>
          <p id="loginError" class="error-message"></p>
        </form>
  
        <div class="signin">
          <button id="signin-button" class="signin-button btn">ENTRAR</button>
          <button id="google-button" class="google-button btn">
          <img class="google-icon-btn" src="../../img/google.png" alt="Ícone do Google"/>
          CONTINUAR COM GOOGLE</button>
        </div>  
        <div>
          <button id="signup-button" class="signup-button btn"> Não tem uma conta? 
          <p class="click-here">Criar conta</p> </button>
        </div> 
      </main>
      `;

  const signUpButton = login.querySelector('#signup-button');
  const signInButton = login.querySelector('#signin-button');
  const googleBtn = login.querySelector('#google-button');
  const email = login.querySelector('.email');
  const password = login.querySelector('.password');
  const loginError = login.querySelector('#loginError');

  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'register';
  });

  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value) {
      signIn(email.value, password.value)
        .then(() => {
          window.location.hash = 'feed';
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            loginError.innerHTML = 'Senha incorreta';
          } else if (error.code === 'auth/invalid-email') {
            loginError.innerHTML = 'E-mail incorreto';
          } else {
            loginError.innerHTML = 'E-mail não cadastrado.';
          }
        });
    }
  });

  googleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle()
      .then(() => {
        window.location.hash = 'feed';
      });
  });

  return login;
}
