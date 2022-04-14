export default function Feed() {
  const feed = document.createElement("div");
  feed.classList.add("post-feed")
  feed.innerHTML = `  
      <div class='perfil-container'>
        <div class='perfil-style'>
        <img class='foto-style' src=''>
        <h1 id='usuario'class='text-style'></h1>
        <p class='text-style'></p>
      </div>
  
      <img id="add-post" class="add-post" alt="adicionar post" src="./img/add.png">
      
      <section id="post" class="post">
        <div class="post-container">
          <img src="./img/fechar.png" alt="Fechar Post" id="close-post" class="close-post">
          <textarea class="post-textarea" rows="5" cols="35" maxlength="180" placeholder="Fale mais sobre seus investimentos."></textarea>
          <button type="submit" id="post-btn" class="post-btn">Postar</button>
        </div>
      </section>
        `;


    const btn = feed.querySelector('#add-post');
    const modalPost = feed.querySelector('#post');
    const btnPost = feed.querySelector('#post-btn');
    const close = feed.querySelector('#close-post');

    btn.onclick = function() {
        modalPost.style.display = "block";
        btn.style.display = "none";
    }
    close.onclick = function() {
        modalPost.style.display = "none";
        btn.style.display = "block";
      }
    btnPost.onclick = function() {
        modalPost.style.display = "none";
        btn.style.display = "block";
    }

  return feed;
}
