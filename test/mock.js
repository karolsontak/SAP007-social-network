import { registerUser } from '../src/firebase.js';

export default function Register() {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <main class="box">
        <div class="banner">
          <img class="logo" src="../../img/logo.png" alt="Logo"/>
          <p class="tittle-banner">CADASTRO</p>
        </div>
                
        <form class="register-form">
          <input class="register-input" id="name" type="name" placeholder="NOME COMPLETO" required/>
          <input class="register-input" id="email" type="email" placeholder="E-MAIL" required/>                    
          <input class="register-input" id="password" type="password" placeholder="SENHA" required/>
          <p id="error-message" class="error-message"></p>
        </form>

        <div class="signup">
          <button id="register-button" class="register-button">CADASTRAR</button>
          <img src="./img/goback.png" id="gobackButton" class="goback-img" alt="Ícone de Seta">
        </div>
        <div id='msgSuccess'></div>
      </main>`;

  const name = rootElement.querySelector('#name');
  const email = rootElement.querySelector('#email');
  const password = rootElement.querySelector('#password');
  const signUpButtonRegister = rootElement.querySelector('#register-button');

  signUpButtonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    registerUser(name.value, email.value, password.value);
  });

  return rootElement;
}
