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
  //A chaque tri du select on recharge la page donc on ouvre la lightbox dans la fonction d'affichage des médias pour que les medias restent cliquables
  openLightbox();
}
// --------------------------------------------------------------

//-------------VARIABLES LIGHTBOX--------------------------------
const bg_lightbox = document.querySelector(".lightbox_container");
const close_lightbox = document.querySelector(".close_bigger");
const lightboxMediaBox = document.querySelector(".lightbox_media_box");
const arrowRight = document.querySelector(".arrow_right");
const arrowLeft = document.querySelector(".arrow_left");
let mediaActive = "";

//--------------------------LIGHTOX-----------------------------------------

// ouverture lighbox en cliquant sur un media et affichage de ce média
function openLightbox() {
  const links = document.querySelectorAll(".media");
  links.forEach((link, index) => {
    link.addEventListener("click", () => {
      mediaActive = index;
      bg_lightbox.style.display = "block";
      affichageLightbox(tableau_medias[mediaActive]);
    });
  });
}
// Fonction qui affiche soit video ou soit photo en fonction du media json dans la lightbox
function bigMediaLightbox(Elmedia) {
  if (Elmedia.image) {
    return (
      '<img class="media" src="' +
      Elmedia.image +
      '" alt="' +
      Elmedia.alt +
      '"img>' +
      '<h2 class="titre_photo_lightbox">' +
      Elmedia.title +
      "</h2>"
    );
  } else if (Elmedia.video) {
    return (
      '<video autoplay loop class="media">' +
      '<source src="' +
      Elmedia.video +
      '" alt="' +
      Elmedia.alt +
      '" type=video/mp4>' +
      "</video> " +
      '<h2 class="titre_photo_lightbox">' +
      Elmedia.title +
      "</h2>"
    );
  }
}
//On injecte la fonction qui définira si photo ou video à afficher
function affichageLightbox(currentMedia) {
  lightboxMediaBox.innerHTML = bigMediaLightbox(currentMedia);
}
//clic flèche suivant
const displayNext = function () {
  mediaActive++;
  if (mediaActive === tableau_medias.length) {
    mediaActive = 0;
  }
  affichageLightbox(tableau_medias[mediaActive]);
};
arrowRight.addEventListener("click", function () {
  displayNext();
});

//clic flèche précédente
const displayPrevious = function () {
  mediaActive--;
  if (mediaActive < 0) {
    mediaActive = tableau_medias.length - 1;
  }
  affichageLightbox(tableau_medias[mediaActive]);
};
arrowLeft.addEventListener("click", function () {
  displayPrevious();
});

// fermeture lightbox au clic sur la croix et on cache le dernier média affiché
function CloseLightbox() {
  close_lightbox.addEventListener("click", () => {
    bg_lightbox.style.display = "none";
  });
}
CloseLightbox();

//navigation au clavier, fleches gauche et droite, touche échap pour sortir
window.addEventListener("keydown", function (e) {
  if (e.key == "ArrowRight") {
    displayNext();
  }
  if (e.key == "ArrowLeft") {
    displayPrevious();
  }
  if (e.key == "Escape") {
    bg_lightbox.style.display = "none";
  }
});
