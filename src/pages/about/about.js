import {
  logout,
} from '/firebase.js'; //eslint-disable-line

export default function AboutUs() {
  const aboutUs = document.createElement('div');
  aboutUs.classList.add('about-post');
  aboutUs.innerHTML = `  
        <nav class="menu">
          <img id="home-btn" class="home-btn" alt="menu home" src="./img/home.png">
          <img id="perfil-btn" class="perfil-btn" alt="menu perfil" src="./img/perfil.png">
          <img id="dev-btn" class="dev-btn" alt="menu desenvolvedoras" src="./img/dev.png">
          <img id="logout-btn" class="logout-btn" alt="menu logout" src="./img/logout.png">
        </nav>
         
        <section id="about-us" class="about-us">
            <p class="title-container"><b> Desenvolvido por: </b></p>
            <div class="daiane">
                <img class="all-img" src="./img/daiane.jpeg" alt="Imagem de Daiane Oltramari">
                <p class="name"><b>Daiane Oltramari</b></p>
                <a class="link-github" href="https://github.com/daianeoltramari" target="_blank">github.com/daianeoltramari</a>
            </div>  
            <div class="karol">
                <img class="all-img" src="./img/karol.jpeg" alt="Imagem de Karol Sontak">
                <p class="name"><b>Karol Sontak</b></p>
                <a class="link-github" href="https://github.com/karolsontak" target="_blank">github.com/karolsontak</a>
            </div>   
            <div class="suelen">
                <img class="all-img" src="./img/suelen.jpeg" alt="Imagem de Suelen Escórcio">
                <p class="name"><b>Suelen Escórcio</b></p>
                <a class="link-github" href="https://github.com/suelenescorcio" target="_blank">github.com/suelenescorcio</a>
            </div>   
        </section>
    `;

  const homeBtn = aboutUs.querySelector('#home-btn');
  const devBtn = aboutUs.querySelector('#dev-btn');
  const logoutBtn = aboutUs.querySelector('#logout-btn');

  homeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'feed';
  });

  devBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'about';
  });

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
    window.location.hash = 'login';
  });

  return aboutUs;
}
