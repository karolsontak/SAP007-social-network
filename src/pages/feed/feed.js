import {
  createPost,
  getAllPosts,
  logout,
  deletePost,
  like,
} from "/firebase.js";

export default function Feed() {
  const feed = document.createElement("div");
  feed.classList.add("feed-post");
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

  const addPost = feed.querySelector("#add-post");
  const homeBtn = feed.querySelector("#home-btn");
  const devBtn = feed.querySelector("#dev-btn");
  const modalPost = feed.querySelector("#post");
  const postBtn = feed.querySelector("#post-btn");
  const closePost = feed.querySelector("#close-post");
  const postFeed = feed.querySelector("#post-textarea");
  const postList = feed.querySelector("#container-post");
  const logoutBtn = feed.querySelector("#logout-btn");
  const likePost = feed.querySelector(".like-post");

  getAllPosts().then((post) => {
    // const userPost = current.user;
    const postCreated = post
      .map(
        (post) => `
        <li class="allposts">
          <div class='identification'> 
            <div>
              <img class='profile-img' src='${post.photo}'>
            </div>
            <div class='text-identification'>
            <p class='username'><b>${post.displayName}</b></p>
            <p class='data-post'> Postado em ${post.data} às ${post.hour} </p>
            </div>
          </div>
          <div class='text-post'>
            <p class='post-print'> ${post.post} </p>
          </div>
          <div class='all-btn'data-postid = "${post.user}}" id = "${post.user}"> 
            <div class='like' data-likeid = "${post.user}">
              <img id="like-post" class="like-post" data-like ="${post.user}" src="./img/like.png" alt="Botão de like">
              <label class='like-length'> ${post.like.length} </label>
            </div>
            <div class="action-btn">
              <img id="edit-post" class="edit-post" src="./img/edit.png" alt="Botão de edição">
              <img class="delete-post" src="./img/trash.png" alt="Botão de deletar">
            </div>
          </div>
        </li>`
      )
      .join("");
    postList.innerHTML = postCreated;

    const deleteObject = feed.querySelector(".delete-post");
    const all = feed.querySelector(".allposts");
    
    deleteObject.addEventListener("click", (e) => {
      e.preventDefault();
      deletePost(post.user);
      all.remove();
    });
  });

  addPost.onclick = function () {
    modalPost.style.display = "block";
    addPost.style.display = "none";
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  closePost.onclick = function () {
    modalPost.style.display = "none";
    addPost.style.display = "block";
  };

  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.hash = "feed";
  });

  postBtn.addEventListener("click", (e) => {
    modalPost.style.display = "none";
    addPost.style.display = "block";
    e.preventDefault();
    if (postFeed.value) {
      createPost(postFeed.value);
      window.location.hash = "feed";
    }
  });

  devBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.hash = "about";
  });

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
    window.location.hash = "login";
  });

  likePost.addEventListener("click", (e) => {
    e.target.dataset.like;
    like();
  });
}
