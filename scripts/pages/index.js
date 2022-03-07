async function getPhotographers() {
  const response = await fetch("../../data/photographers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayData(data.photographers);
      return data.photographers;
    });
}

async function displayData(photographers) {
  photographersSection = document.querySelector(".photographerContainer");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  await getPhotographers();
}

init();

/*
let photographerData = [];
console.log(photographerData);
async function displayData() {
  photographerData = await getPhotographers();

  document.querySelector(".photographer-container").innerHTML = photographerData
    .map((photographer) => {
      return `
      <div class="photographer_cards">
      <img src="Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="">
      <h2>Mimi Keel</h2>
      <div>
        <h3>London, UK</h3>
        <p>J'adore la photo </p>
        <p>350$</p>
        <ul>
          <li>#Portraits</li>
        </ul>
      </div>
    </div>
      `;
    })
    .join("");
}*/
/*
 Sophia JS
 const photographerDisplay = async () => {
  photographerData = await fetchPhotographer();
  document.querySelector('.photographer-container').innerHTML = photographerData
    .map((photographer) => {
      const tags = [];
      for (let i = 0; i < photographer.tags.length; i += 1) {
        tags.push(
          `  <li><a aria-label="${photographer.tags[i]}" href="#" class="tag" data-tag="${photographer.tags[i]}">#${photographer.tags[i]}</a></li>`,
        );
      }

      return `
        <sec
        */
const photographerDisplay = async () => {
  photographerData = await getPhotographers();
  document.querySelector(".photographer-container").innerHTML = photographerData
    .map((photographer) => {
      const tags = [];
      for (let i = 0; i < photographer.tags.length; i += 1) {
        tags.push(
          `  <li><a aria-label="${photographer.tags[i]}" href="#" class="tag" data-tag="${photographer.tags[i]}">#${photographer.tags[i]}</a></li>`
        );
      }

      return `
                <section class="photographer">
                  <a href="./photographer.html?id=${
                    photographer.id
                  }" class="photographer-link">
                    <img src="images/photographers/${
                      photographer.portrait
                    }" class="profile-image" alt="" />
                    <h2 class="photographer__name profile-name">${
                      photographer.name
                    }</h2>
                  </a>
                  <div class="photographer__description">
                    <p lang="en" class="photographer__location profile-location" >${
                      photographer.city
                    }, ${photographer.country}</p>
                    <p class="photographer__tagline">${photographer.tagline}</p>
                    <p aria-label="${
                      photographer.price
                    } euros par jour" class="photographer__price"><span aria-hidden="true">${
        photographer.price
      }€/jour</span></p>
                  </div>
                  <ul lang="en">
                    ${tags.join("")}
                 </ul>
              </section>
                `;
    })
    .join("");
};
