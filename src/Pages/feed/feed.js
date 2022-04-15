export default function Feed() {
  const feed = document.createElement("div");
  feed.classList.add("feed-post")
  feed.innerHTML = `  
      <div class="perfil-container">
        <div class="perfil-style">
        <img class="foto-style" src=''>
        <p id="usuario" class="text-style"></p>
        <p class="text-style"></p>
      </div>
      
      <div class="menu">
        <img id="home-btn" class="home-btn" alt="menu home" src="./img/home.png">
        <img id="perfil-btn" class="perfil-btn" alt="menu perfil" src="./img/perfil.png">
        <img id="notification-btn" class="notification-btn" alt="menu notification" src="./img/notification.png">
        <img id="logout-btn" class="logout-btn" alt="menu logout" src="./img/logout.png">
      </div>

      <img id="add-post" class="add-post" alt="adicionar post" src="./img/add.png">
      
      <section id="post" class="post">
        <div class="post-container">
          <img src="./img/close.png" alt="Fechar Post" id="close-post" class="close-post">
          <textarea class="post-textarea" rows="5" cols="35" maxlength="180" placeholder="Fale mais sobre seus investimentos."></textarea>
          <button type="submit" id="post-btn" class="post-btn">Postar</button>
        </div>
      </section>

      <section id="my-posts" class="my-posts">
        <div class="my-posts-container">
          <p class="perfil-name"></p>  
          <textarea class="post-textarea" rows="5" cols="35" maxlength="180" placeholder="Aqui fica o meu post!"></textarea>            
          <div class="change-btn">
            <img id="edit-btn" class="edit-btn" alt="botão editar" src="./img/edit.png">
            <img id="delete-btn" class="delete-btn" alt="botão deletar" src="./img/trash.png">
          </div>
        </div>
      </section>

      <section id="timeline" class="timeline">
        <div class="timeline-container">
          <textarea class="timeline-textarea" rows="5" cols="35" maxlength="180" placeholder="Aqui fica o post de quem seu sigo!"></textarea>
        </div>
      </section>
        `;

    const addPost = feed.querySelector('#add-post');
    const homeBtn = feed.querySelector('#home-btn');
    const modalPost = feed.querySelector('#post');
    const postBtn = feed.querySelector('#post-btn');
    const closePost = feed.querySelector('#close-post');

    addPost.onclick = function() {
        modalPost.style.display = "block";
        addPost.style.display = "none";
    }
    closePost.onclick = function() {
        modalPost.style.display = "none";
        addPost.style.display = "block";
      }
    postBtn.onclick = function() {
        modalPost.style.display = "none";
        addPost.style.display = "block";
    }

    homeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "feed";
    });

  return feed;
}
