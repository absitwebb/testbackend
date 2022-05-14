//variable img bannière
let Imgbannierelogin = "public/img/login.png";

//affiche img et text dans bannière vintage
// fonctions du fichier fonctions.js
affichImgBanniere(Imgbannierelogin);
AffichTextBanniere("bienvenue");

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

  const Envoiloginuser = async () => {
    // envoie formulaire et prodit vers serveur
    const envoiServ = fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(envoieuserconnect),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        tokens = data;
        //si token de contient pas d'erreur
        if (!tokens.error == true) {
          //on enregistre token dans la base donnée
          localStorage.setItem("tokens", JSON.stringify(tokens));
          // on ouvre la page tous produits
          location.assign("../frontend/produit.html");
        } else {
          error.innerHTML = tokens.error;
          console.log(tokens.error);
        }
      })
      .catch((err) => {
        console.log("ereur:" + err);
        valid = false;
        console.log(valid);
      });
  };
  Envoiloginuser();
});
