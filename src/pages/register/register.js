import {
  registerUser,
} from '../../firebase.js';

export default function Register() {
  const register = document.createElement('div');
  register.classList.add('register-box');
  register.innerHTML = `
      <main class="box">
        <div class="banner">
          <img class="logo" src="../../img/logo.png" alt="Logo"/>
          <p class="tittle-banner">CADASTRO</p>
        </div>
                
        <form class="register-form">
          <input class="register-input name" type="name" placeholder="NOME COMPLETO" required/>
          <input class="register-input email" type="email" placeholder="E-MAIL" required/>                    
          <input class="register-input password" type="password" placeholder="SENHA" required/>
          <p id="error-message" class="error-message"></p>
        </form>

        <div class="signup">
          <button id="register-button" class="register-button">CADASTRAR</button>
          <img src="./img/goback.png" id="gobackButton" class="goback-img" alt="Ícone de Seta">
        </div>
      </main>
    `;

  const name = register.querySelector('.name');
  const email = register.querySelector('.email');
  const password = register.querySelector('.password');
  const errorMessage = register.querySelector('#error-message');

  const gobackButton = register.querySelector('#gobackButton');
  gobackButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'home';
  });

  const signUpButtonRegister = register.querySelector('#register-button');
  signUpButtonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    if (name.value && email.value && password.value) {
      registerUser(name.value, email.value, password.value)
        .then(() => {
          window.location.hash = 'feed';
        })
        .catch((error) => {
          if (error.code === 'auth/uid-already-exists') {
            errorMessage.innerHTML = 'E-mail já cadastrado';
          } else if (error.code === 'auth/email-already-in-use') {
            errorMessage.innerHTML = 'E-mail já cadastrado';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage.innerHTML = 'E-mail invalido';
          } else {
            errorMessage.innerHTML = 'Erro! Preencha novamente.';
          }
        });
    } else if (name.value === '' || email.value === '' || password.value === '') {
      errorMessage.innerHTML = 'Preencha todos os campos!';
    }
  });

  return register;
}
