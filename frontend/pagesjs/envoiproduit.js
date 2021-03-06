//-------------------------on déclare variables et constantes-----------------------------------

const ContainerContact = document.querySelector(".formContact");

//------------------------------------------------------------
// vérification formulaire
let myForm = document.getElementById("formenvoieproduit");
let FormContactid2 = document.forms["formenvoieproduit"];
let error = document.querySelectorAll(".errorform");
let inputsForm = document
  .getElementById("formenvoieproduit")
  .getElementsByTagName("input");

let textareaForm = document
  .getElementById("formenvoieproduit")
  .getElementsByTagName("textarea");
let valid = true;
let inputfiles = document.getElementById("image");
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
  let imgForm = inputsForm["image"].value;
  // variable qui récupère  le prix produit
  let priceForm = inputsForm["price"].value;

  // si la condition est ok on crée un objet avec toutes les
  // données du formulaire

  objproduit = {
    title: titleForm,
    description: textForm,
    price: priceForm,
    userId: userId,
  };

  // -----juste l'image au format formdata----------------
  const formfile = new FormData();
  formfile.append(" imageUrl", inputfiles.files[0]);
  console.log(formfile.get(" imageUrl"));
  const formstringg = JSON.stringify(formfile);

  // tout le formulaire
  const formdatafile = new FormData(FormContactid2);
  formdatafile.append("userId", userId);
  const envoiFormdata = JSON.stringify(formdatafile);

  console.log(formdatafile.get("description"));
  console.log(formdatafile.get("title"));
  console.log(formdatafile.get("price"));
  console.log(formdatafile.get("image"));
  console.log(formdatafile.get("userId"));

  //-----pour voir toute les clés
  for (var key of formdatafile.keys()) {
    console.log(key);
  }
  //----------------------------------------

  objproduitdata = {
    title: formdatafile.get("description"),
    description: formdatafile.get("title"),
    price: formdatafile.get("price"),
    userId: formdatafile.get("userId"),
    //imageUrl: formdatafile.get("image"),
  };
  thing = JSON.stringify(objproduitdata);
  console.log(thing);

  //-------------avec boucle for--------------------------------------
  const formDataob = new FormData(FormContactid2);
  formDataob.append("userId", userId);

  result = {};

  for (var entry of formDataob.entries()) {
    result[entry[0]] = entry[1];
  }

  result = JSON.stringify(result);
  console.log(result);
  //----------------------------------------------------

  const EnvoiConfirmServer = async () => {
    // envoie formulaire et produit vers serveur
    const envoiServ = fetch("http://localhost:3000/api/stuff/", {
      method: "POST",
      body: thing,
      formfile,

      headers: {
        //"Content-Type": "application/x-www-form-urlencoded ",
        "Content-Type": "application/json",
        //Accept: " application/json",
        Authorization: `${userId} ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Resproduct = data;
      })

      .catch((err) => console.log("ereur:" + err));
  };
  EnvoiConfirmServer();
});
