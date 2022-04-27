import {
  createPost, 
  getAllPosts, 
  logout,
  deletePost,
  likePost
} from '/firebase.js';

export default function Feed() {
  const feed = document.createElement("div");
  feed.classList.add("feed-post")
  feed.innerHTML = `  
      <nav class="menu">
        <img id="home-btn" class="home-btn" alt="menu home" src="./img/home.png">
        <img id="perfil-btn" class="perfil-btn" alt="menu perfil" src="./img/perfil.png">
        <img id="dev-btn" class="dev-btn" alt="menu desenvolvedoras" src="./img/dev.png">
        <img id="logout-btn" class="logout-btn" alt="menu logout" src="./img/logout.png">
      </nav>

      <img id="add-post" class="add-post" alt="adicionar post" src="./img/add.png">
      
      <section id="post" class="post">
        <div class="post-container">
          <img src="./img/close.png" alt="Fechar Post" id="close-post" class="close-post">
          <textarea class="post-textarea" id="post-textarea" rows="5" cols="35" maxlength="180" placeholder="Fale mais sobre seus investimentos."></textarea>
          <button type="submit" id="post-btn" class="post-btn">Postar</button>
        </div>
      </section>

      <section class="post-feed">
        <ul id="container-post"></ul>
      </section>
    `;

    const addPost = feed.querySelector('#add-post');
    const homeBtn = feed.querySelector('#home-btn');
    const devBtn = feed.querySelector('#dev-btn');
    const logoutBtn = feed.querySelector('#logout-btn');
    const modalPost = feed.querySelector('#post');
    const postBtn = feed.querySelector('#post-btn');
    const closePost = feed.querySelector('#close-post');
    const postFeed = feed.querySelector('#post-textarea');
    const postList = feed.querySelector('#container-post');

    getAllPosts()
    .then(posts => {
      console.log(posts);
      const postCreated = posts.map(post => `
        <li class="allposts" data-id="${post.id}">
          <div class="identification"> 
            <div>
              <img class="profile-img" src="${post.photo}">
            </div>
            <div class="text-identification">
            <p class="username"><b>${post.displayName}</b></p>
            <p class="data-post"> Postado em ${post.data} às ${post.hour}H</p>
            </div>
          </div>
          <div class="text-post">
            <p class="post-print"> ${post.post} </p>
          </div>
          <div class="all-btn"> 
            <div class="like">
              <img class="like-post" data-like="true" src="./img/like.png" alt="Botão de like">
              <p class="like-length"> ${post.like.length} </p>
            </div>
            <div class="action-btn">
              <img class="edit-post" data-edit="true" src="./img/edit.png" alt="Botão de edição">
              <img class="delete-post" data-delete="true" src="./img/trash.png" alt="Botão de deletar">
            </div>
          </div>
        </li>`
      ).join('')
      postList.innerHTML = postCreated;

      const postsElements = feed.querySelectorAll(".allposts");
      postsElements.forEach(post => {
        post.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;

          if(e.target.dataset.delete){
          deletePost(id)
          .then(() => {
            post.remove(); 
          })
          }

          if(e.target.dataset.like){
            const likeCount = feed.querySelector(".like-length");
            const likeIcon = feed.querySelector(".like-post");
            likePost(id)
            .then((status) => {
              likeCount.textContent = status.count;
              likeIcon.setAttribute("src", "./img/liked.png")
            })         
          }
        })
      })
    
    addPost.onclick = function() {
        modalPost.style.display = "block";
        addPost.style.display = "none";
    }
    closePost.onclick = function() {
        modalPost.style.display = "none";
        addPost.style.display = "block";
      }

    homeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "feed";
    });

    postBtn.addEventListener("click", (e) => {
      modalPost.style.display = "none";
      addPost.style.display = "block";
      e.preventDefault();
      createPost(postFeed.value);
    });

    devBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = "about";
    });

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
      window.location.hash = "login";
    });
  })
  return feed;
}
