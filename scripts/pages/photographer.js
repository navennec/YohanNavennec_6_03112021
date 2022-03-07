fetch("../../data/photographers.json")
  .then((response) => {
    //  then = on attend//
    return response.json();
  })
  .then((data) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log(id);
    let medias = data.media;
    let photographers = data.photographers;
    console.log(photographers);
    photographers.forEach((photographer) => {
      if (photographer.id == id) {
        let cardPhotographer = document.querySelector(".photograph-header");

        cardPhotographer.innerHTML = ` <h1 class="photographer__h1">${photographer.name}</h1>
        <h2>${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
        <button class="contact_button">contactez-moi</button>
        <img class="photoProfil" src="../../Sample Photos/Photographers ID Photos/${photographer.portrait}">
        `;
      }
    });
    medias.forEach((media) => {
      if (media.photographerId == id) {
        let photographerImages = document.querySelector(".photographerImages");

        let mediaDiv = document.createElement("div");

        /* a completer */
        mediaDiv.innerHTML = `
        <div class="cardInfos">
        <img class="cardImage">  
        <img class="photographerWork" src="../../Sample Photos/${media.photographerId}/${media.image}">  
        <p>${media.likes}</p>
        <div class="heart">
        <i  onclick = "clickLike" class="far fa-heart"></i>
        </div>
        </div>
        `;

        /* a completer */
        photographerImages.appendChild(mediaDiv);
      }
    });
  });
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
