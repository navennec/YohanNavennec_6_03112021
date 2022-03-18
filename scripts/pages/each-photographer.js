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

        cardPhotographer.innerHTML = ` <div photographer_info> <h1 class="photographer__h1">${photographer.name}</h1>
        <h2>${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
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
        
        ${choix_media(media)}
        <div class="card_text">
        <p class="mediaTitle">${media.title}</p>
        <div class="media_coeur">
        <p class="mediaTitle">${media.likes}</p>
    
        <i  onclick = "clickLike" class="far fa-heart heart"></i>
        </div>
        </div>
        </div>
        `;
        /* a completer */
        photographerImages.appendChild(mediaDiv);
      }
    });
  });
/*.    Avant ligne 36 à la place de choix medi..       <img class="photographerWork" src="../../Sample Photos/${media.photographerId}/${media.image}">  */
function choix_media(media) {
  if (media.image) {
    return ` <img class="photographerWork" src="../../Sample Photos/${media.photographerId}/${media.image}">`;
  } else if (media.video) {
    return ` <video class="photographerWork">
      <source src="../../Sample Photos/${media.photographerId}/${media.video}" type="video/mp4">
      </video>`;
  }
}

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





/*. function de vincent pour choix image ou video


  function choix_media(Elmedia) {
    if (Elmedia.image) {
      return (
        '<img class="media" src="' +
        Elmedia.image +
        '" alt="' +
        Elmedia.alt +
        '"img>'
      );
    } else if (Elmedia.video) {
      return (
        '<video class="media">' +
        '<source src="' +
        Elmedia.video +
        '" alt="' +
        Elmedia.alt +
        '" type=video/mp4>' +
        '</video> '
      );
    }
  }*

  */

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
