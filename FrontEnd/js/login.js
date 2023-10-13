const form = document.querySelector("form");
const errorMessage = document.querySelector("#error-message");

form.addEventListener("submit", (event) => {
    
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch ("http://localhost:5678/api/users/login", { 
        method : "POST",
        headers:{ 
            "Accept" : "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    // error message if wrong login or password
        .then((r) => {
            if (!r.ok) {
                throw new Error("Identifiant ou mot de passe incorrect");
            }
            return r.json();
        })
        .then((data) => {
        console.log("data : ",data);
            window.localStorage.setItem("jeton", data.token);
            // Redirect to site page with action buttons for site editing
            window.location.href = "index.html";
        })
        .catch((error) => {
            // Show error message
            errorMessage.innerHTML = "<i class=\"fa-solid fa-triangle-exclamation\"></i> " + error.message ;
        });
});