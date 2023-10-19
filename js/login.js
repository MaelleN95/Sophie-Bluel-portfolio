// Retrieving form elements
const form = document.querySelector("form");
const errorMessage = document.querySelector(".error-message");
const submitButton = document.querySelector("input[type=submit]");
let inputEmail = document.getElementById("email");
let inputPw = document.getElementById("password");



/**
 * Function that checks a character string against a Regular Expression
 * @param {string} string - character string to check
 * @param {*} regExp - Regular Expression
 * @returns {boolean} TRUE if the regEx is respected, otherwise FALSE
 */
function verifByRegExp(string, regExp){
    if (regExp.test(string)){
        return true
    } else {
        return false
    }
}



/**
 * Function that adds a "submit" event listener to the form and sends the request if the logins and passwords are correct, 
 * otherwise displays an error message
 */
function logIn() {
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
            .then((r) => {
                if (r.ok){
                    return r.json();
                }
                throw new Error ("Erreur dans l'identifiant ou le mot de passe");
            })
            .then((data) => {
                // Storing the token in localStorage
                window.localStorage.setItem("token", data.token);
                console.log(window.localStorage);
                // Redirect to site page with action buttons for site editing
                window.location.href = "index.html";
            })
            .catch((error) => {
                // Show error message if the username or password are incorrect
                errorMessage.innerHTML = "<i class=\"fa-solid fa-triangle-exclamation\"></i> " + error.message ;
            });
    });
}



/**
 * Function that starts the verification of the username and password only if the RegEx are respected on the 2 inputs.
 */
function verifUserInputs(){
    submitButton.disabled = true;
    if ((verifEmail) && (verifPw)){
        // make the submit button accessible
        submitButton.disabled = false;
        logIn()
    }
}




/* ********************************
************ Body code ************
//****************************** */



// Creating regEx for an email and a password
const regExpEmail = new RegExp ('^[a-z][a-z0-9._-]+[a-z0-9_-]@[a-z0-9][a-z0-9.-]+\\.[a-z]{2,10}$');
const regExpPw = new RegExp ('^([a-zA-Z0-9@#$%^&+=*.\\-_]){4,}$');

// Creation of variables whose value is the value of the inputs
let email = inputEmail.value;
let password = inputPw.value;

// Creation of the variables that will receive the regEx response
let verifEmail = false;
let verifPw = false;

// Add "change" listener on the 2 inputs
inputEmail.addEventListener("change",()=>{
    // Updating the value of the input
    email = inputEmail.value;
    // Execution of the regEx verification function
    verifEmail = verifByRegExp(email,regExpEmail);
    // Depending on the answer, add or remove a class that indicates an error to the user 
    // ("input-error" circles the field in red)
    if (verifEmail) {
        inputEmail.classList.remove("input-error");
    } else {
        inputEmail.classList.add("input-error");
    }
    // Each time the value of the field changes, run the verification of user inputs
    verifUserInputs()
});

inputPw.addEventListener("change",()=>{
    password = inputPw.value;
    verifPw = verifByRegExp(password,regExpPw);
    if (verifPw) {
        inputPw.classList.remove("input-error");
    } else {
        inputPw.classList.add("input-error");
    }
    verifUserInputs()
});