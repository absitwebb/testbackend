//-------------------------on déclare variables et constantes-----------------------------------
const injectRecappanier = document.getElementById("injectRecappanier");
const injectRecappanierTotal = document.getElementById(
  "injectRecappanierTotal"
);
const ContainerContact = document.querySelector(".formContact");
const ContainerValidCommande = document.querySelector(".ValidCommand");
let body2 = "";
const titletable = [
  "Article",
  "Choix objectif",
  "Quantité",
  "Prix Unitaire",
  "Prix total",
];
let contact;
//--------------on va chercher les produits du localstorage------------------------------------
let addProduitBasket = JSON.parse(localStorage.getItem("produit"));
//------------------------------------------------------------
//variable img bannière
let ImgbanniereCommande = "public/img/commander.png";
//affiche img et text dans bannière vintage
affichImgBanniere(ImgbanniereCommande);
AffichTextBanniere("Votre commande");
//------------------------------------------------------------
// fonction création d'un tableau des produits commandés
function tableCreate() {
  var body = document.body,
    // on crée un tableau
    tbl = document.createElement("table");
  // --on crée ligne et cellules pout les titres----------
  var tr = tbl.insertRow();
  for (var i = 0; i < titletable.length; i++) {
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(titletable[i]));
    td.style.background = "rgb(114, 113, 113)";
    td.style.color = "white";
    td.style.fontSize = "2.5rem";
  }
  //on crée lignes et cellules et on met les produits du localstorage
  for (var i = 0; i < addProduitBasket.length; i++) {
    // on insert une nouvelle ligne dans le tableau
    var tr = tbl.insertRow();
    // on insert une nouvelle cellule
    var td = tr.insertCell();
    // on met du contenu dans la cellule
    td.appendChild(document.createTextNode(addProduitBasket[i].name));
    td = tr.insertCell();
    // on met du contenu dans la cellule
    td.appendChild(document.createTextNode(addProduitBasket[i].lentillechoix));
    // on met du contenu dans la cellule
    td = tr.insertCell();
    td.appendChild(document.createTextNode(addProduitBasket[i].quantite));
    td = tr.insertCell();
    td.appendChild(
      document.createTextNode(`
       ${addProduitBasket[i].price.toString().replace(/00/, "")} €`)
    );
    td = tr.insertCell();
    td.appendChild(
      document.createTextNode(`
        ${
          addProduitBasket[i].price.toString().replace(/00/, "") *
          addProduitBasket[i].quantite
        } €`)
    );
  }

  body2 = body.appendChild(tbl);
  injectRecappanier.appendChild(body2);
}

tableCreate();
refSomProduits();
//------------------------------------------------------------
// vérification formulaire
let FormContactid2 = document.forms["formContactid"];
let error = document.querySelectorAll(".errorform");
let inputsForm = document
  .getElementById("formContactid")
  .getElementsByTagName("input");
let valid = true;

// on regarde se qui est taper dans le formulaire
FormContactid2.addEventListener("submit", (e) => {
  e.preventDefault();
  // variable qui récupère prénom
  let FirstNameForm = inputsForm["prenom"].value;
  // variable qui récupère nom
  let NameForm = inputsForm["nom"].value;
  let AdressForm = inputsForm["adresse"].value;
  let CityForm = inputsForm["ville"].value;
  // variable qui récupère email
  let email = inputsForm["Email"].value;
  let valid = true;

  // on vérifie si le prénom utilisateur est correcte et pas vide
  if (checkName(FirstNameForm) && !FirstNameForm == "") {
    error[0].classList.add("errorformValid");
    error[0].innerHTML = ` ok`;
  } else {
    error[0].innerHTML = `erreur, prénom non valide`;
    valid = false;
  }

  // on vérifie si le nom utilisateur est correcte et pas vide
  if (checkName(NameForm) && !NameForm == "") {
    error[1].classList.add("errorformValid");
    error[1].innerHTML = ` ok`;
  } else {
    error[1].innerHTML = `erreur, Nom non valide`;
    valid = false;
  }

  // on vérifie si l'adresse est correcte et pas vide
  if (checkAdress(AdressForm) && !AdressForm == "") {
    error[2].classList.add("errorformValid");
    error[2].innerHTML = ` ok`;
  } else {
    error[2].innerHTML = `erreur, adresse non valide`;
    valid = false;
  }
  // on vérifie si la ville est correcte est correcte et pas vide
  if (checkName(CityForm) && !CityForm == "") {
    error[3].classList.add("errorformValid");
    error[3].innerHTML = ` ok`;
  } else {
    error[3].innerHTML = `erreur, ville nom valide`;
    valid = false;
  }

  //on vérifie si le mail est valide et pas vide
  if (checkEmail(email) && !email == "") {
    error[4].classList.add("errorformValid");
    error[4].innerHTML = ` ok`;
  } else {
    error[4].innerHTML = `erreur, adresse mail non valide`;
    valid = false;
  }

  // on test l'ensemble du formulaire
  if (valid == true) {
    // si la condition est ok on crée un objet avec toutes les
    // données du formulaire
    contact = {
      firstName: FirstNameForm,
      lastName: NameForm,
      address: AdressForm,
      city: CityForm,
      email: email,
    };
    EnvoiConfirmServer();
    localStorage.removeItem("produit");
  }
});
