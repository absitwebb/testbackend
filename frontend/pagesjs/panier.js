//variable panier
let formContact = document.querySelector(".formContact");
let suitecommande = document.getElementById("suitecommande");
let blocPanierTitle = document.getElementById("blocPanier-title");
let injectJS = document.getElementById("injectJS");
//------------------------------------------------------------
//variable img bannière
let ImgbanniereCommande = "public/img/panier.png";
//affiche img et text dans bannière vintage
affichImgBanniere(ImgbanniereCommande);
AffichTextBanniere("Votre panier");
// --------------------------afficher produit dans panier -------------------------------
//on va chercher dans le localstorage le produit
// on le transforme en objet (parse)
let addProduit = JSON.parse(localStorage.getItem("produit"));

// on vérifie si il y à un produit
const basketaffich = async () => {
  // ___________si addProduit est vrai (si produit dans le tableau)_______________)
  if (addProduit) {
    await addProduit;

    //on affiche le formulaire lorsqu'on clique sur le bouton continuer du récapitulatif
    suitecommande.addEventListener("click", () => {
      location.href = "command.html";
    });
    // si produit dans le panier on chande de titre
    blocPanierTitle.innerHTML = `<h2 id="titre-panier">Panier</h2>`;
    // on affiche les éléments du produit
    //_______________________on injecte le prduit dans page html________________________
    injectJS.innerHTML = addProduit
      .map(
        (produit) =>
          `
             <div id="panier-produit">
     
              <!--_____________block 1 image____________-->
              <div id="panier-produit_image">
                <img src="${produit.imageUrl}" alt="appareil ${produit.name}" />
              </div>
              <!--_____________ block 2 produit___________-->
              <div id="panier-produit_ref">
                <h2> ${produit.name}</h2>
                 <p>${produit.lentillechoix}</p>
                <p class="CprimaryText">${produit.price
                  .toString()
                  .replace(/00/, "")}€</p>
                <p>Ref:<br/>${produit._id}</p>
                <p class="ColorGreen">en stock</p>
              </div>
              <!--_____________ block 3 change produit___________-->
              <div id="panier-produit_change">
                <div class="change-select">
                  <button class="bouton-moins" data-id="${
                    produit._id
                  }" data-lentille="${produit.lentillechoix}" >-</button>
                  <span class="produit-quantité">${produit.quantite}</span>
                 
                  <button class="bouton-plus" data-id="${
                    produit._id
                  }" data-lentille="${produit.lentillechoix}">+</button>
                </div>
               <!--____on calcule la quantité de produit avec le prix___________-->
                <div class="change-price"><p>${
                  produit.quantite * produit.price.toString().replace(/00/, "")
                }€</p></div>
                <div><i class=" bouton-poubelle fas fa-trash-alt gris" data-id="${
                  produit._id
                }" data-lentille="${produit.lentillechoix}"></i></div>
             
             </div>
                        </div>
             `
      )
      .join("");
    // fonction supprimer produit dans panier avec la poubelle
    removeProduit();
    // fonction bouton + pour rajouter produit
    buttonPlusQuantite();
    // fonction bouton minimum et supprimer quantité
    buttonMinQuantite();
    // mettre le prix et quantité total du panier dans récapitulatif
    refSomProduits();
    return;

    //__________________ sinon pas de produits_____________________________________
  } else {
    formContact.classList.add("affichcontactnone");
    suitecommande.addEventListener("click", () => {
      alert("Ajoutez des produits au panier");
    });
  }
};
// fonction pour afficher le produit_________________
basketaffich();

// affiche la quantité total des produits dans le panier
ajoutpanierQauntiteTotal();
