function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  //on met le curseur dans le premier champ qui est celui du prénom
  prenom.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
function modalePhotographerName(ownName) {
  //changement du nom de contact en fonction du photographe affiché dans la modale
  let name_banner = document.querySelector(".title-photographe");
  name_banner.innerHTML = ownName.name;
}
