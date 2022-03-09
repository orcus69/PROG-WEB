import { createPost, getPosts, deletePosts, updatePosts} from "../../src/models/firestore.js";
  const wrapper = document.querySelectorAll(".wrapper");
  const createPosts = document.getElementById("createPost");
  var posts = [{}];
  var idPost = "";

  (async () => {
    posts = await getPosts();
    generatePosts();
  })();

  createPosts.addEventListener("click", () => {
    addPost();
  });


  async function generatePosts() {
    wrapper.forEach(( _item ) => ( _item.innerHTML = "" ));
    posts.map(( _posts ) => {
      wrapper.forEach((e) => {
        e.appendChild(
          renderItem(
              _posts.id,
              _posts.data.title,
              _posts.data.content,
              _posts.data.author,
          )
        );
      });
    });
    addEventListenerDelete();
    addEventListenerUpdate();
  }

  //Renderiza um post na tela
  const renderItem = ( _id, _title, _content, _author ) => {
    const postsItem = document.createElement("div");
    postsItem.className = "post card bg-primary mt-4 ";
    postsItem.setAttribute("id", _id);
    postsItem.innerHTML = `
      <div class="card-header justify-content-between d-flex">
          <h2 class=""> <b>${_title}</b> </h2>
          <div class="text-white">
          <a href="#" id="edit" class="mr-2 text-white">Editar</a>
          <a href="#" id="delete" class="text-white">Excluir</a>
          </div>
      </div>
      <div class="card-body">
          <blockquote class="blockquote mb-0">
          <p class="text-dark"><b>${_content}</b></p>
          <footer class="blockquote-footer text-white">${_author}</footer>
          </blockquote>
      </div>`;
    return postsItem;
  };

  //Exclui a postagem selecionada
  function addEventListenerDelete() {
    const deleteButton = document.querySelectorAll("#delete");
    deleteButton.forEach((_button) => {
      _button.addEventListener("click", (e) => {
        console.log(e.target.parentNode.parentNode.parentNode.getAttribute("id"));
        deletePosts(e.target.parentNode.parentNode.parentNode.getAttribute("id"));
        posts = posts.filter(( _item ) => {
          return _item.id != e.target.parentNode.parentNode.parentNode.getAttribute("id");
        });
        generatePosts();
      });
    });
  }


  //Preenche os campos de postagem com a postagem selecionada
  function addEventListenerUpdate() {
    const updateButton = document.querySelectorAll("#edit");
    updateButton.forEach((_button) => {
      _button.addEventListener("click", (e) => {
        let id = e.target.parentNode.parentNode.parentNode.getAttribute("id");

        const title = document.getElementById("title");
        const author = document.getElementById("author");
        const content = document.getElementById("content");

        posts.map(( _posts ) => {
          if( _posts.id == id ){
            idPost = _posts.id;
            title.value = _posts.data.title;
            author.value = _posts.data.author;
            content.value = _posts.data.content;

            document.querySelector("#createPost").innerHTML = "Atualizar"
          }
        });
        console.log(idPost);
      });
    });
  }

  //Adiciona um post
  async function addPost() {
    const id = document.getElementsByClassName("id-content");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");
  
    if (content.value != "" && title.value != "") {

      //Edita documento atual caso tenha um ID definido
      if( idPost != ""){
        await updatePosts(
          idPost, 
          {
            title: title.value,
            content: content.value,
            author: author.value,
          }
        ).then(async () => {
          posts = await getPosts();
          generatePosts();
          idPost = "";
          title.value = "";
          author.value = "";
          content.value = "";
          document.querySelector("#createPost").innerHTML = "Postar"
        }).catch((e) => {
          console.log(e);
        });
        
      }else{
        //Caso contrario faz um novo registro

        await createPost(
          title.value,
          content.value,
          author.value,
        ).then(async () => {
          posts = await getPosts();
          generatePosts();
          title.value = "";
          author.value = "";
          content.value = "";
        }).catch((e) => {
          console.log(e);
        });
      }
    } else {
      console.log('Preencha todos os dados');
      const card = document.getElementById("posts")

      const warning = document.createElement("div");
      warning.className = "alert alert-danger ";
      warning.innerHTML = "Preencha todos os dados!"

      card.appendChild(
        warning
      );
    }
  }