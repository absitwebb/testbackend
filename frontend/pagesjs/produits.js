//variable img bannière
let ImgbanniereVintage = "public/img/camera-vintage.png";

//affiche img et text dans bannière vintage
// fonctions du fichier fonctions.js
affichImgBanniere(ImgbanniereVintage);
AffichTextBanniere("Vintage");

//-------------------------------------------------------
/* On récupère les tokens depuis le localStorage */

let tokens = JSON.parse(localStorage.getItem("tokens"));
if (!tokens) {
  /* Traitement dans le cas où aucun token n'existe dans le localStorage */
}

/* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
let userId = tokens.userId;
let token = tokens.token;

/* On créer l'en-tête Authorization contenant le JWT */
const headers = new Headers();
headers.append("Authorization", `${userId} ${token}`);

const options = {
  method: "GET",
  mode: "cors",
  headers,
};

//--------------------------------------------------------------
//requete flex produits
let ProduitsData = [];
//récupère data dans lien flex
const RecupProduits = async () => {
  await fetch("http://localhost:3000/api/stuff/", options)
    .then((res) => res.json())
    .then((data) => {
      ProduitsData = data;
    })
    .catch((err) => console.log("ereur:" + err));
};

// récupère et affiche chaque produit
const ProduitsLists = async () => {
  await RecupProduits();
  document.querySelector(".affichProduits").innerHTML = ProduitsData.map(
    (Produit) => `
  <div id="cam ${Produit._id}" class="bloc-produit">
  <a href="valid-produit.html?id=${Produit._id}">
   <h3 class="bloc-produit_title">${Produit.title}</h3>
   <img class="bloc-produit_img" src="${Produit.imageUrl}" alt="image produit ${
      Produit.name
    }"/> 
   <p class="bloc-produit_descript"> ${Produit.description}</p>
   <p class="bloc-produit_price">${Produit.price
     .toString()
     .replace(/0+$/, "")} Euros </p>
     
 </a>
     </div>
  `
    // join pour supprimer virgule entre chaque affichage de produit
  ).join("");
};
ProduitsLists();

//-----------afficher quantité panier dans bannière------------

ajoutpanierQauntiteTotal();
