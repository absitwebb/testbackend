//variable img bannière
let Imgbannierelogin = "public/img/login.png";

//affiche img et text dans bannière vintage
// fonctions du fichier fonctions.js
affichImgBanniere(Imgbannierelogin);
AffichTextBanniere("bienvenue");

// on récupère l'adresse url et id
let parametre = new URL(document.location).searchParams;
let id = parametre.get("id");

//-------------------------on déclare variables et constantes-----------------------------------

const ContainerContact = document.querySelector(".formContact");
const ContainerValidCommande = document.querySelector(".formeuserconnect");

//------------------------------------------------------------
// vérification formulaire
let FormContactid2 = document.forms["formeuserconnect"];

let messerror = document.querySelector(".container-error");
let error = messerror.querySelector(".errorform");

let inputsForm = document
  .getElementById("formeuserconnect")
  .getElementsByTagName("input");

let valid = false;

// on regarde se qui est taper dans le formulaire
FormContactid2.addEventListener("submit", (e) => {
  e.preventDefault();
  // variable qui récupère email
  let EmailForm = inputsForm["connectemail"].value;
  // variable qui récupère nom
  let passwordForm = inputsForm["passeword"].value;

  // si la condition est ok on crée un objet avec toutes les
  // données du formulaire
  envoieuserconnect = {
    email: EmailForm,
    password: passwordForm,
  };
  // si demande création nouveau utilisateur
  if (id == "new") {
    EnvoiNewUser();
    error.innerHTML =
      "connexion crée: vous allez être redirigé vers la page connexion";
    function renvoiConnect() {
      location.assign("../frontend/userconnect.html");
    }
    setTimeout(renvoiConnect, 8000);
  }
  // si connexion utilisateur déja enregistré
  else {
    Envoiloginuser();
  }
});
