export default function Feed() {
  const feed = document.createElement("div");
  feed.classList.add("post-and-coment")
  feed.innerHTML = `  
 <img id="btn-modal" class="btn-modal" alt="adicionar post" src="./img/add.png">
  <div id="post" class="modal">
    <section class="post-container">
        <textarea class="textarea-style" rows="5" cols="35" maxlength="180" placeholder="Fale mais sobre seus investimentos."></textarea>
        <img src="./img/fechar.png" alt="Fechar Post" class="close">
    </section>
    <div class="post-btn-area">
        <button type="submit" id="btn-post" class="feed-btn">Postar</button>
        </div>
  </div>

        `;
    const btn = feed.querySelector('#btn-modal');
    const modalPost = feed.querySelector('#post');
    const btnPost = feed.querySelector('#btn-post');
    const close = feed.querySelector('.close');

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
