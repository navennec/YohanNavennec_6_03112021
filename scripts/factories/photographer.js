function photographerFactory(data) {
  const { name, portrait, id } = data;

  const picture = `assets/photographers/${portrait}`;
  const href = `../photographer.html?id=${id}`;
  console.log(href);

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("photographers-img");
    const h2 = document.createElement("h2");
    const a = document.createElement("a");
    a.setAttribute("href", href);
    h2.textContent = name;
    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
/* Fonction pour ajouter les médias des photographes vidéos ou images dans le .json */

function media_photographe_display(Elmedia) {
  let media_photographe = document.createElement("div");
  media_photographe.classList.add("media_photographe");
  document.querySelector("media_photographe").appendChild(media_photographe);
  media_photographe.innerHTML =
    choix_media(Elmedia) +
    '<div class="media_texte">' +
    '<p class="media_title">' +
    Elmedia.title +
    "</p>" +
    '<div class="media_heart" aria-label="likes">' +
    '<p class="nb_likes" id=' +
    Elmedia.id +
    ">";
  Elmedia.likes +
    "</p>" +
    '<div class="coeur">' +
    '<i onclick = "clickJaime (' +
    Elmedia.id +
    ')" class="far fa-heart"></i>' +
    "</div>" +
    "</div>" +
    "</div>";
}
