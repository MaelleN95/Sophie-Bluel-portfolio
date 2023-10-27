// Create a variable containing all the projects in the portfolio
let allProjects = [];
let divFilters = document.querySelector(".filters");

const errorMessage = document.querySelector(".error-message");

/**
 * Function for showing a notification.
 * @param {string} message - Message to display in the notification bubble.
 * @param {number} duration - Duration in milliseconds of notification display time.
 * @param {string} BgColor - Notification colour (in quote mark in the format of your choice : values with a keyword, hexadecimal, RGB/A, etc).
 */
function showNotification(message, duration, BgColor) {
  let notification = document.getElementById('notification');
  notification.style.backgroundColor = BgColor;
  notification.textContent = message;
  notification.classList.remove("hidden");

  setTimeout(() => { notification.classList.add("hidden")}, duration);
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
  generateFiltersCategoriesInModal(categories);
})
.catch((error) => {
  console.log(error)
  errorMessage.classList.remove("hidden");
  errorMessage.innerHTML = "<i class=\"fa-solid fa-triangle-exclamation\"></i> Erreur : " + error.message;
})


/**
 * project gallery generation function
 */
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


/**
 * Function to generate filter buttons and make them active.
 */
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
  showNotification("Déconnectée",2000,"#f4a261");
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
  resetAddPhotoModal();
})

overlay.addEventListener("click", () => {
  closeModal(photoGalleryModal);
  closeModal(addPhotoModal);
  resetAddPhotoModal();
})

for (i = 0 ; i < modalCloseButtons.length ; i++) {
  modalCloseButtons[i].addEventListener("click",()=>{
    closeModal(photoGalleryModal);
    closeModal(addPhotoModal);
    resetAddPhotoModal();
  })
}





/* ***************************************
************ MODAL MANAGEMENT ************
*************************************** */





/* ******************************
************ MODAL 1 ************
****************************** */



/**
 * Project gallery generation function in modal 1.
 */
function generateEditGallery (works) {
  // Retrieving elements from modal 1
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";

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

    // Add an event listener for delete when the trash can icon is clicked
    trashIcon.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Voulez-vous vraiment supprimer ce projet ?\nCette action est irréversible.")) {
          deleteElement(works[i].id);
      }
    });

    modalGallery.appendChild(article);
    article.appendChild(img);
    article.appendChild(trashIcon);
  }
}


/**
 * Function for deleting an element from the gallery and the API.
 * @param {number} workId - The project ID to be deleted from the API.
 */
function deleteElement(workId) {
  const token = window.localStorage.getItem("token");

  // Make a "DELETE" request to the API to delete project
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
        showNotification("Erreur : le projet n'a pas pu être supprimé",3000, "red");
        // Details of the error in the console
        console.error("Erreur "+ response.status +" lors de la suppression de la photo de l'API : " + response.statusText);
      }
  })
  .catch(error => {
    showNotification("Erreur : le projet n'a pas pu être supprimé",3000, "red");
    // Details of the error in the console
    console.error("Erreur "+ error.status +" de connexion à l'API : " + error);
  });
}



/* ******************************
************ MODAL 2 ************
****************************** */


/** 
 * Function that generates category filters via the API in the add photos modal.
 */
function generateFiltersCategoriesInModal(categories){
  dropDownListCategories = document.getElementById("category");

  for (let i = 0 ; i < categories.length ; i++){
    let element = document.createElement("option");

    element.value = categories[i].id;
    element.textContent = categories[i].name;

    dropDownListCategories.appendChild(element);
  }
}

/** 
 * Function that resets the add photo form to zero (including image display).
 */
function resetAddPhotoModal() {
  submitButton.disabled = true;
  addPhotoModal.classList.remove("enlarged");

  selectedFile.name = "";
  selectedFile = {};
  imageElement.removeAttribute("src");
  imageElement.classList.add("hidden");
  errorInputFile.innerHTML = "";
  errorInputFile.classList.add("hidden");
  fileUploadBlock.classList.remove("input-error");
  for (i = 0 ; i < fileUploadBlockElements.length ; i++) {
    fileUploadBlockElements[i].classList.remove("hidden");
  }
  
  title = null;
  verifTitle = false;
  errorInputTitle.innerHTML = "";
  errorInputTitle.classList.add("hidden");
  explainTitleRegEx.classList.add("hidden");
  labelTitle.style.color = "initial";
  titleInput.classList.remove("input-error");

  projectForm.reset();
}



/**
 * Function that starts the add of a project only if the inputs aren't empty and respect the RegEx.
 * Otherwise, Input error display management.
 */
function verifUserInputs(){
  submitButton.disabled = true;
  if (!title) {
    addPhotoModal.classList.add("enlarged");
    errorInputTitle.classList.remove("hidden");
    explainTitleRegEx.classList.add("hidden");
    errorInputTitle.innerHTML = "Veuillez remplir ce champ.";
    labelTitle.style.color = "red";
    titleInput.classList.add("input-error");

  } else if (!verifTitle) {
    addPhotoModal.classList.add("enlarged");
    errorInputTitle.classList.remove("hidden");
    explainTitleRegEx.classList.remove("hidden");
    errorInputTitle.innerHTML = "Veuillez saisir un titre valide.";
    labelTitle.style.color = "red";
    titleInput.classList.add("input-error");

  } else {
    errorInputTitle.innerHTML = "";
    addPhotoModal.classList.remove("enlarged");
    errorInputTitle.classList.add("hidden");
    explainTitleRegEx.classList.add("hidden");
    labelTitle.style.color = "initial";
    titleInput.classList.remove("input-error");
  }


  if (!selectedFile.name){
    errorInputFile.classList.remove("hidden");
    errorInputFile.innerHTML = "Veuillez choisir une image.";
    fileUploadBlock.classList.add("input-error");

  }else {
    errorInputFile.classList.add("hidden");
    fileUploadBlock.classList.remove("input-error");

  }

  if ((selectedFile.name) && (verifTitle)) {
    submitButton.disabled = false;
  }
}






/* ********************************
************ Body code ************
//****************************** */





// Retrieving form elements
let projectForm = document.getElementById("project-form");
const submitButton = document.getElementById("confirm-button");
let titleInput = document.getElementById("title");
const labelTitle = document.getElementById("label-title");
const fileInput = document.getElementById("file-upload");

let errorInputTitle = document.querySelector(".error-input-title");
let errorInputFile = document.querySelector(".error-input-file");
const explainTitleRegEx = document.getElementById("title-regEx-explication");

const fileUploadBlock = document.querySelector(".file-upload-block");

let fileUploadBlockElements = document.querySelectorAll(".file-upload-block-elements")

const imageElement = document.createElement('img');
imageElement.classList.add("imgFileInput");

let selectedFile = {}

const regExpTitle = new RegExp ('^[A-Z][A-Za-z0-9\\s\'\\(\\)-]{3,26}$');

// Creation of variables whose value is the value of the inputs
let title = titleInput.value;
let category = document.getElementById("category").value;

// Creation of the variables that will receive the regEx response
let verifTitle = false;

// Add "change" listener on the title input
titleInput.addEventListener("change",()=>{
    // Updating the value of the input
    title = titleInput.value;
    verifTitle = false;
    // Execution of the regEx verification function
    verifTitle = regExpTitle.test(title);
    // run the verification of user inputs
    verifUserInputs();  
});

// display the image chosen by the user via the input file in the "file-upload-block" div each time one is selected.
fileInput.addEventListener("change", (event) => {
  // Extraction of the file selected by the user
  selectedFile = event.target.files[0];

    if (selectedFile) {
      const maxSizeInBytes = 4 * 1024 * 1024;

      console.log(maxSizeInBytes)
      console.log("mon fic :", selectedFile.size)

      // check file size
      if (selectedFile.size > maxSizeInBytes) {
        addPhotoModal.classList.add("enlarged");
        errorInputFile.classList.remove("hidden");
        errorInputFile.innerHTML = "La taille du fichier est supérieure à 4 Mo. Veuillez choisir un fichier plus petit.";
        fileUploadBlock.classList.add("input-error");
        selectedFile = {};

      } else {
        addPhotoModal.classList.remove("enlarged");
        fileUploadBlock.classList.remove("input-error");
        errorInputFile.classList.add("hidden");
        
        // Creation of a URL object for the selected image so that it can be displayed at a later time
        const imageUrl = URL.createObjectURL(selectedFile);

        // Assign the image URL to the image element
        imageElement.setAttribute("src", imageUrl);
        imageElement.classList.remove("hidden"); // if it's already hidden because it's not the first time it's chosen an image

        // Hide elements already present in the div
        for (i = 0 ; i < fileUploadBlockElements.length ; i++){
          fileUploadBlockElements[i].classList.add("hidden");
        }

        fileUploadBlock.appendChild(imageElement);

        verifUserInputs();
      }
    }
});


//adds a "submit" event listener to the form and sends the request to add an image if the fields are correctly completed, otherwise displays an error message
projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const category = document.getElementById("category").value;

  // Creation of a FormData object to send data
  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("title", title);
  formData.append("category", category);

  // "POST" request options
  const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      },
      body: formData
  };
  
  // Make a "POST" request to the API to add the project
  fetch("http://localhost:5678/api/works", requestOptions)
      .then(response => {
          if (response.ok) {
              resetAddPhotoModal();
              showNotification("Projet ajouté avec succès !",3000, "#2b9348");
          } else {
            showNotification("Erreur : le projet n'a pas pu être ajouté",3000, "red");
            console.error("Erreur "+ response.status +" lors de l'ajout de la photo à l'API : " + response.statusTextErreur);

          }
      })
      .catch(error => {
        showNotification("Erreur : le projet n'a pas pu être ajouté",3000, "red");
          console.error("Erreur de connexion à l'API : " + error);
      });
});