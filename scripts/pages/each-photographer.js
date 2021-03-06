//-------------VARIABLES LIGHTBOX--------------------------------
const bg_lightbox = document.querySelector(".lightbox_container");
const close_lightbox = document.querySelector(".close_lightbox");
const lightboxMediaBox = document.querySelector(".lightbox_media_box");
const arrowRight = document.querySelector(".arrow_right");
const arrowLeft = document.querySelector(".arrow_left");
let mediaActive = "";

//--------------------------------------------------------------
//variable recupérant les médias du photographe affichés dans un tableau
let tableau_medias = [];

fetch("../../data/photographers.json")
  .then((response) => {
    //  then = on attend//
    return response.json();
  })
  .then((data) => {
    let arrayMedias = [];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log(id);
    let medias = data.media;
    tableau_medias = medias.filter((media) => {
      return id == media.photographerId;
    });
    console.log(tableau_medias);
    let photographers = data.photographers;
    console.log(photographers);
    photographers.forEach((photographer) => {
      if (photographer.id == id) {
        let cardPhotographer = document.querySelector(".photograph-header");

        cardPhotographer.innerHTML = ` <div photographer_info> <h1 class="photographer__h1">${photographer.name}</h1>
        <h2>${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img class="photoProfil" src="../../Sample Photos/Photographers ID Photos/${photographer.portrait}">
        `;
      }
    });

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
    } //
    //On injecte la fonction qui définira si photo ou video à afficher
    /* function affichageLightbox(currentMedia) {
      lightboxMediaBox.innerHTML = bigMediaLightbox(currentMedia);
    }. */

    // fermeture lightbox au clic sur la croix et on cache le dernier média affiché
    function CloseLightbox() {
      close_lightbox.addEventListener("click", () => {
        bg_lightbox.style.display = "none";
      });
    }
    CloseLightbox();
    /*
    Sélectionner la lightbox et la remettre en display visible

Récupérer la src de l'image cliquée avec e.target.getAttribute (e étant l'event du listener)

Sélectionner l'image de la lightbox pour lui mettre la src récupérée (avec setAttribute)
Pour la lightbox, un des moyens les plus simples c'est de faire comme une modale. 
En gros dans l'html  j'écris tout le code, la balise avec l'img qui sont au centre de la page
 en gros mais je mets tout ça en display none.

Lorsque tu cliques sur une image (donc il faut mettre un eventlistener), tu récupères le src de l'image cliquée : e.target.getAttribute("src")

Une fois fait, tu sélectionnes l'image de la lightbox et tu lui changes sa src pour mettre celle de l'image cliquée (avec setAttribute cette fois)

Ensuite tu remets en display visible pour que la lightbox s'affiche et le tour est joué

Il faut aussi faire le compteur de likes global.

    */
    /*  faire une lightbox*/

    medias.forEach((media) => {
      if (media.photographerId == id) {
        arrayMedias.push(media);
        let photographerImages = document.querySelector(".photographerImages");

        let mediaDiv = document.createElement("div");

        /* a completer */
        mediaDiv.innerHTML = `
        <div class="cardInfos">
        
        ${choix_media(media)}
        <div class="card_text">
        <p class="mediaTitle">${media.title}</p>
        <div class="media_coeur">
        <p class="mediaTitle">${
          media.likes
        }</p><i class="fa fa-heart heart"></i>
        </div>
        </div>
        </div>
        `;
        /* a completer */
        photographerImages.appendChild(mediaDiv);
      }
    });
    let addLike = document.querySelectorAll(".heart");
    addLike.forEach((coeur) => {
      coeur.addEventListener("click", (e) => {
        let compteur = e.target.previousSibling;
        console.log(e);
        let likeAdded = parseInt(compteur.innerText) + 1;
        console.log(compteur);
        compteur.innerText = likeAdded;
      });
    });

    let photos = document.querySelectorAll(".photographerWork");
    photos.forEach((photo, index) => {
      photo.addEventListener("click", (e) => {
        let lightbox = document.querySelector(".lightbox_container");
        mediaActive = index;
        lightbox.style.display = "block";
        affichageLightbox(tableau_medias[mediaActive]);

        /* !! passer lightbox en visible et recuperer le SRC de l'img avec les get Atribute*/
      });
    });
    totalLikesPriceDay();

    //Injection dans l'html de la bannière des likes totaux et du tarif/jour du photographe
function totalLikesPriceDay() {
  //injection de la bannière deslikes totaux
  let total_likes = document.createElement("span");
  total_likes.setAttribute("id", "likes");
  document.querySelector("#likes_price").appendChild(total_likes);
  total_likes.innerHTML = '<p id="total_likes">';
  '</p>' + '<i class="far fa-heart total"></i>';
  /* Ajout du prix du photographe affiché par jour  */
  let price_day = document.createElement("span");
  price_day.setAttribute("id", "price_day");
  document.querySelector("#likes_price").appendChild(price_day);
  price_day.innerHTML += `${likesPrice.price}€ / jour`;
  /*à changer.  price_day.innerHTML += `${likesPrice.price}€ / jour`;
  faire boucle avec les medias du photographe qui sont dans le arrayMedias
  dans une variable additionner tous les Likes
  injecter avec innerHTML le total de likes*/
  console.log("test");
}

  });

function choix_media_lightbox(media) {
  if (media.image) {
    return (
      ` <img class="img-lightbox" src="../../Sample Photos/${media.photographerId}/${media.image}">` +
      `<h2 class="title-lightbox">${media.title}</h2>`
    );
  } else if (media.video) {
    return (
      ` <video autoplay loop class="img-lightbox">
        <source src="../../Sample Photos/${media.photographerId}/${media.video}" type="video/mp4"> 
        </video>` + `<h2 class="title-lightbox">${media.title}</h2>`
    );
  }
}

function affichageLightbox(currentMedia) {
  lightboxMediaBox.innerHTML = choix_media_lightbox(currentMedia);
}

/*.    Avant ligne 36 à la place de choix medi..         <img class="photographerWork" src="../../Sample Photos/${media.photographerId}/${media.image}">  */
function choix_media(media) {
  if (media.image) {
    return ` <img class="photographerWork" src="../../Sample Photos/${media.photographerId}/${media.image}">`;
  } else if (media.video) {
    return ` <video class="photographerWork">
      <source src="../../Sample Photos/${media.photographerId}/${media.video}" type="video/mp4">
      </video>`;
  }
}

// clic fleche droite
const flecheDroite = function () {
  mediaActive++;
  if (mediaActive === tableau_medias.length) {
    mediaActive = 0;
  }
  affichageLightbox(tableau_medias[mediaActive]);
};
document
  .querySelector(".fa-angle-right")
  .addEventListener("click", function () {
    flecheDroite();
  });
// clic fleche gauche (en arriere---)
const flecheGauche = function () {
  mediaActive--;
  if (mediaActive < 0) {
    mediaActive = tableau_medias.length - 1;
  }
  affichageLightbox(tableau_medias[mediaActive]);
};
document.querySelector(".fa-angle-left").addEventListener("click", function () {
  flecheGauche();
});


//----------------------FILTRE DROPDOWN-------------------------------

//On écoute au changement de filtre dropdown le choix et on réaffiche les médias en fonction du résultat de popularité, date ou titre
function filterDropdown() {
  let dropdown = document.querySelector(".photographer__selectOption--wraper")
  dropdown.addEventListener("change", function (e) {
    e.target.value;
    containerMedias.querySelector(".photographer__selectOption");

    containerMedias.innerHTML = "";
    

    if (e.target.value == "popularite") {
      tableau_medias.sort((a, b) => (a.likes > b.likes ? 1 : -1));
    } else if (e.target.value == "date") {
      tableau_medias.sort((a, b) => (a.date > b.date ? 1 : -1));
    } else if (e.target.value == "titre") {
      tableau_medias.sort((a, b) => (a.title > b.title ? 1 : -1));
    }

      media_photographe_display(tab);
      /* appeler la fonction avec le bon nom */
  });
}
filterDropdown();
/* function ++ click */

/* +++++++. 14 mars à faire pour la prochaine ++++++
Incrementer les likes

faire une variables qui recupere le nombre de likes dans le JSON (media.like)

let 
medias.forEach((media) => {
      if (media.photographerId == id) {
       ajouter le nombre de likes et l'ajouter


la lightBox
compteur de likes globales en bas a droite
le mettre en element fixé en bas de la page avec les regles de position
 
pour la modal contactez moi avec les regles de position pour etre toujours en haut de l'ecran 
voire doc position pour retirer du flux avec un fixed

styliser "un peu" le filtre popularité







/* Ajouter les catres photos en HTML si il y a des photos corespondantes 
à l'ID dans photographers.JASON */

/**
 * Déclarer une variable `x` dont la valeur est égale à `66`.
 * Déclarer une variable `y` dont la valeur est égale à `12`.
 * Déclarer une variable `result` dont la valeur est égale à la somme de `x`
 * et `y`.
 * Afficher la valeur de la variable `result` dans la console du navigateur
 *
 * Mettre le CSS sur la fiche photographer
 * + styliser le boutton
 *
 * La prochaine fois comment faire pour les medias : listes des photos
 * il faut faire une boucle avec les medias.
 *
 * media. for each
 * if photographer id == id de l'url generer l'img
 */
/*___________________________________________________________________________________*/
/* Fonction pour ajouter les médias des photographes vidéos ou images dans le .json */
/*
function media_photographe_display(Elmedia) {
  let media_photographe = document.createElement('div');
  media_photographe.classList.add('media_photographe');
  document.querySelector('media_photographe').appendChild(media_photographe);
  media_photographe.innerHTML =
  choix_media(Elmedia)+
  '<div class="media_texte"> +
  '<<p class="media_title">' +
  Elmedia.title +
  '</p>' +
  '<div class="media_heart" aria-label="likes">' +
  '<p class="nb_likes" id=' +
  Elmedia.id +
  '>'
  Elmedia.likes +
  '</p>' +
  '<div class="coeur">' +
  '<i onclick = "clickJaime (' + 
  Elmedia.id + 
  ')" class="far fa-heart"></i>' +
  '</div>' +
  '</div>' +
  '</div>';
}
*/

/* * media. for each
 * if photographer id == id de l'url generer l'img
 */
/*
medias.forEach((Elmedia) => {
  if (idURL == Elmedia.photographerID) {
    media_photographe_display(Elmedia);
    clickJaime(Elmedia);
    tableau_medias.push(Elmedia);
  }
});
*/
/* 28/02
faire mettre des dimentions en CSS 
photographerImages

mettre des classes dans le HTML pour y mettre du StyleSheet
mettre la modale contactez moi.
*/

/* 15 03 2022 essayer d incrementer le nommbre de like des coeur */

/*function clickJaime(id) {
  tableau_medias.forEach((addLike) => {
    if (addLike.id == id) {
      addLike.likes += 1;
      document.getElementById(id).innerHTML = addLike.likes;
    }
  });
  totalLikes(tableau_medias);
  */
/* 
A Faire pour plus tard 

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
*/
