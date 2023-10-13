// Retrieving projects from the API
async function fetchWorks () {
  const response = await fetch('http://localhost:5678/api/works');
  if (response.ok){
    return response.json();
  }
  throw new Error ("Les projets n'ont pas pu être chargé");
}

// Creation of a project gallery generation function
function generateGallery (works) {
  let divGallery = document.querySelector(".gallery");
  divGallery.innerHTML = "";

  for (let i = 0; i < works.length; i++){
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      img.setAttribute("src", works[i].imageUrl);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = works[i].title;
      figcaption.setAttribute("alt", works[i].title);

      divGallery.appendChild(figure);
      figure.appendChild(img, figcaption);
  } 
}


fetchWorks().then(works => {
  generateGallery(works);
  console.log("works : ", works);
})


