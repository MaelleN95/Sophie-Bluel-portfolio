// Create a variable containing all the projects in the portfolio
let allProjects = [];

const errorMessage = document.querySelector(".error-message");

// Retrieving projects from the API
async function fetchWorks () {
  const response = await fetch('http://localhost:5678/api/works');
  if (response.ok){
    return response.json();
  }
  throw new Error ("Les projets n'ont pas pu être chargé");
}

fetchWorks().then(works => {
  generateGallery(works);
  allProjects = works;
})
.catch((error) => {
  console.log(error)
  errorMessage.classList.remove("message-hidden");
  errorMessage.innerHTML = "<i class=\"fa-solid fa-triangle-exclamation\"></i> Erreur : " + error.message;
})

// Retrieving categories from the API
async function fetchCategories () {
  const response = await fetch('http://localhost:5678/api/categories');
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
  let divFilters = document.querySelector(".filters");

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