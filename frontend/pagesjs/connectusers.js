//-------------------------on déclare variables et constantes-----------------------------------

const ContainerContact = document.querySelector(".formContact");
const ContainerValidCommande = document.querySelector(".formeuserconnect");

//------------------------------------------------------------
// vérification formulaire
let FormContactid2 = document.forms["formeuserconnect"];
let error = document.querySelectorAll(".errorform");
let inputsForm = document
  .getElementById("formeuserconnect")
  .getElementsByTagName("input");

let valid = true;

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

        localStorage.setItem("tokens", JSON.stringify(tokens));
        //let cletoken = Resproduct.token;
        location.assign("../frontend/produit.html");
        console.log(tokens.userId);
      })

      .catch((err) => console.log("ereur:" + err));
  };
  Envoiloginuser();
});
