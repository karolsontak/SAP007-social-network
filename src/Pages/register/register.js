import { registerUser, saveUser} from "/firebase.js";

export default function Register() {
  const register = document.createElement("div");
  register.classList.add("register-box")
  register.innerHTML = `
      <main class="box">
        <div class="banner">
          <img class="logo" src="../../img/LOGO.png" alt="Logo"/>
          <p class="tittle-banner">CADASTRO</p>
        </div>
                
        <form class="register-form">
          <input class="register-input" id="name" type="name" placeholder="NOME COMPLETO" required/>
          <input class="register-input" id="email" type="email" placeholder="E-MAIL" required/>                    
          <input class="register-input" id="password" type="password" placeholder="SENHA" required/>
          <p id="email-error" class="error-message"></p>
        </form>

        <div class="signup">
          <button id="register-button" class="register-button">CADASTRAR-SE</button>
          <img src="./img/goback.png" id="gobackButton" class="goback-img" alt="Ícone de Seta">
        </div>
      </main>
    `;

  const name = register.querySelector("#name");
  const email = register.querySelector("#email");
  const password = register.querySelector("#password");
  // const emailError = register.querySelector('#email-error');

  const gobackButton = register.querySelector("#gobackButton");
  gobackButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.hash = "home";
  });

  const signUpButtonRegister = register.querySelector(
    "#register-button"
  );
  signUpButtonRegister.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser(name.value, email.value, password.value);
    // .then(() => {
    //   saveUserUpdate(name.value);
    // })
    // .catch((error) => {
    //   if (error.code === 'auth/uid-already-exists') {
    //     emailError.innerHTML = 'E-mail já cadastrado';
    //   } else if (error.code === 'auth/email-already-in-use') {
    //     emailError.innerHTML = 'E-mail já cadastrado';
    //   } else if (error.code === 'auth/invalid-email') {
    //     emailError.innerHTML = 'E-mail invalido';
    //   } else {
    //     emailError.innerHTML = 'Preencha novamente.';
    //   }
    // });
    window.location.hash = "feed";
    
  });

  return register;
}
