//-------------------------on déclare variables et constantes-----------------------------------

const ContainerContact = document.querySelector(".formContact");

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
  // on extrait token et id utilsateur du localstorage
  let tokens = JSON.parse(localStorage.getItem("tokens"));
  let userId = tokens.userId;
  let token = tokens.token;
  // variable qui récupère  le nom du produit
  let titleForm = inputsForm["title"].value;
  // variable qui récupère la dexcription
  let textForm = textareaForm["description"].value;
  // variable qui récupère  l'image du produit
  let imgForm = inputsForm["fileimage"].value;
  // variable qui récupère  le prix produit
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
    // envoie formulaire et produit vers serveur
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
