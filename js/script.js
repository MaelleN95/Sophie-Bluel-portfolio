// Create a variable containing all the projects in the portfolio
let allProjects = [];
let divFilters = document.querySelector(".filters");

const errorMessage = document.querySelector(".error-message");

// Function for showing a notification
function showNotification(message, duration, BgColor) {
  let notification = document.getElementById('notification');
  notification.style.backgroundColor = BgColor;
  notification.textContent = message;
  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, duration);
}

// Retrieving projects from the API
async function fetchWorks () {
  const response = await fetch("http://localhost:5678/api/works");
  if (response.ok){
    return response.json();
  }
  throw new Error ("Les projets n'ont pas pu être chargé");
}

fetchWorks().then(works => {
  generateGallery(works);
  generateEditGallery(works);
  
  allProjects = works;
})
.catch((error) => {
  console.log(error)
  errorMessage.classList.remove("hidden");
  errorMessage.innerHTML = "<i class=\"fa-solid fa-triangle-exclamation\"></i> Erreur : " + error.message;
})

// Retrieving categories from the API
async function fetchCategories () {
  const response = await fetch("http://localhost:5678/api/categories");
  if (response.ok){
    return response.json();
  }
  throw new Error ("Les filtres des catégories n'ont pas pu être chargé");
}

fetchCategories().then(categories => {
  generateFiltersCategories(categories);
})
.catch((error) => {
  console.log(error)
  errorMessage.classList.remove("message-hidden");
  errorMessage.innerHTML = "<i class=\"fa-solid fa-triangle-exclamation\"></i> Erreur : " + error.message;
})


// Creation of a project gallery generation function
function generateGallery (works) {
  let divGallery = document.querySelector(".gallery");
  divGallery.innerHTML = "";

  for (let i = 0 ; i < works.length ; i++){
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");
      let divImg = document.createElement("div");

      img.setAttribute("src", works[i].imageUrl);
      img.setAttribute("crossorigin", "anonymous");
      img.setAttribute("alt", works[i].title);
      figcaption.innerHTML = works[i].title;
      
      divGallery.appendChild(figure);
      figure.appendChild(divImg);
      figure.appendChild(figcaption);
      divImg.appendChild(img);
  } 
}


// Create a function to generate filter buttons and make them active
function generateFiltersCategories(categories) {

  // Add one button to display all projects without filter
  let allButton = document.createElement("button");

  allButton.textContent = "Tous";
  allButton.classList.add("filters-button");
  allButton.setAttribute("id","all-button");

  divFilters.appendChild(allButton);

  // "allButton" click management
  allButton.addEventListener("click", () => {
    generateGallery(allProjects);
  });
  
  // "for" loop to browse all filter categories
  for (let i = 0 ; i < categories.length ; i++) {
    // Add one button for each category
    let button = document.createElement("button");

    button.textContent = categories[i].name;
    button.classList.add("filters-button");

    divFilters.appendChild(button);

    // click management for each button
    button.addEventListener("click", () => {
      const filteredProjects = allProjects.filter( (project) => {
        return project.categoryId === categories[i].id;
      })
      generateGallery(filteredProjects);
    })
  }
}






/* ***************************************
******* REDIRECT TO THE ADMIN PAGE *******
*************************************** */





const homepageEditElements = document.querySelectorAll(".homepage-edit");
// Retrieving interactive buttons
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const editButton = document.getElementById("editButton");

// Retrieving modal elements
const overlay = document.querySelector(".overlay");
const photoGalleryModal = document.querySelector(".photo-gallery-modal");
const addPhotoModal = document.querySelector(".add-photo-modal");

const modalCloseButtons = document.querySelectorAll(".modal-close");
const modalReturnButton = document.querySelector(".modal-return");
const addPhotoButton = document.getElementById("add-photo-button");


// Check if admin connected
if (localStorage.getItem("token")) {
  for (let i = 0 ; i < homepageEditElements.length ; i++){
    homepageEditElements[i].classList.remove("hidden");
  }
  loginButton.classList.add("hidden");
  divFilters.classList.add("hidden");
  showNotification("Connectée",2000,"#40916c");
}

// Logout
logoutButton.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  console.log(window.localStorage);
  for (i = 0 ; i < homepageEditElements.length ; i++){
    homepageEditElements[i].classList.add("hidden");
  }
  loginButton.classList.remove("hidden");
  divFilters.classList.remove("hidden");
})

// creation of modals opening and closing functions

function openModal (modalName) {
  overlay.classList.remove("hidden");
  modalName.classList.remove("hidden");
}

function closeModal (modalName) {
  overlay.classList.add("hidden");
  modalName.classList.add("hidden");
}

// managing the opening and closing of modals

editButton.addEventListener("click", () => {
  openModal(photoGalleryModal);
})

addPhotoButton.addEventListener("click", () => {
  closeModal(photoGalleryModal);
  openModal(addPhotoModal);
})

modalReturnButton.addEventListener("click", () => {
  closeModal(addPhotoModal);
  openModal(photoGalleryModal);
})

overlay.addEventListener("click", () => {
  closeModal(photoGalleryModal);
  closeModal(addPhotoModal);
})

for (i = 0 ; i < modalCloseButtons.length ; i++) {
  modalCloseButtons[i].addEventListener("click",()=>{
    closeModal(photoGalleryModal);
    closeModal(addPhotoModal);
  })
}





/* ***************************************
************ MODAL MANAGEMENT ************
*************************************** */





/* ******************************
************ MODAL 1 ************
****************************** */



/* *****************************************
** Gallery generation function in modal 1 **
***************************************** */
function generateEditGallery (works) {
  // Retrieving elements from modal 1
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";
  console.log(works)

  // Generation of the modification gallery via the API
  for (let i = 0 ; i < works.length ; i++){
    let article = document.createElement("article");
    let img = document.createElement("img");
    let trashIcon = document.createElement("i");

    article.setAttribute("id",i+1)
    img.setAttribute("src", works[i].imageUrl);
    img.setAttribute("crossorigin", "anonymous");
    img.setAttribute("alt", works[i].title);
    
    trashIcon.classList.add("fa-solid", "fa-trash-can");

    // Add an event listener for delete when the bin icon is clicked
    trashIcon.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Voulez-vous vraiment supprimer cette photo ? Cette action est irréversible.")) {
          deleteElement(article, works[i].id);
          openModal(photoGalleryModal);
      }
    });

    // Inserting elements in the DOM
    modalGallery.appendChild(article);
    article.appendChild(img);
    article.appendChild(trashIcon);
  }
}

/* ****************************************************************
** Function for deleting an element from the gallery and the API **
**************************************************************** */
function deleteElement(element, workId) {
  const token = window.localStorage.getItem("token");
  
  // Delete the item from the gallery page
  element.remove();
  showNotification("Projet supprimé avec succès !",3000, "#2b9348");

  // Make a 'DELETE' request to the API to delete element
  fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token,
        "Accept" : "*/*"
      }
  })
  .then(response => {
      if (response.ok) {
        showNotification("Projet supprimé avec succès !",3000, "#2b9348");
      } else {
        console.error("Erreur "+ response.status +" lors de la suppression de la photo de l'API : " + response.statusText);
      }
  })
  .catch(error => {
      console.error("Erreur "+ error.status +" de connexion à l'API : " + error);
  });
}