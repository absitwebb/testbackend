//-------------------------on déclare variables et constantes-----------------------------------

const ContainerContact = document.querySelector(".formContact");
const ContainerValidCommande = document.querySelector(".ValidCommand");
let body2 = "";

//------------------------------------------------------------
// vérification formulaire
let FormContactid2 = document.forms["formenvoieproduit"];
let error = document.querySelectorAll(".errorform");
let inputsForm = document
  .getElementById("formenvoieproduit")
  .getElementsByTagName("input");

let textareaForm = document
  .getElementById("formenvoieproduit")
  .getElementsByTagName("textarea");
let valid = true;

// on regarde se qui est taper dans le formulaire
FormContactid2.addEventListener("submit", (e) => {
  e.preventDefault();
  let tokens = JSON.parse(localStorage.getItem("tokens"));
  let userId = tokens.userId;
  let token = tokens.token;
  // variable qui récupère prénom
  let titleForm = inputsForm["title"].value;
  // variable qui récupère nom
  let textForm = textareaForm["description"].value;
  let imgForm = inputsForm["fileimage"].value;
  let priceForm = inputsForm["price"].value;

  // si la condition est ok on crée un objet avec toutes les
  // données du formulaire
  envoieProduitobj = {
    title: titleForm,
    description: textForm,
    imageUrl: imgForm,
    price: priceForm,
    userId: userId,
  };

  const EnvoiConfirmServer = async () => {
    // envoie formulaire et prodit vers serveur
    const envoiServ = fetch("http://localhost:3000/api/stuff/", {
      method: "POST",
      body: JSON.stringify(envoieProduitobj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userId} ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Resproduct = data;
        console.log(Resproduct);
      })

      .catch((err) => console.log("ereur:" + err));
  };
  EnvoiConfirmServer();
});
