let ProduitValidData = [];
let recNcarte = "";

//variable img bannière
let ImgbanniereCommande = "public/img/commander.png";
//affiche img et text dans bannière vintage
affichImgBanniere(ImgbanniereCommande);
AffichTextBanniere("Commander");

// on récupère l'adresse url et id
let parametre = new URL(document.location).searchParams;
let id = parametre.get("id");

//récupère data du produit dans lien flex
const RecupProduitValid = async () => {
  // attention pour url on utilise guillemets du 7
  await fetch(`http://localhost:3000/api/stuff/${id}`)
    .then((res) => res.json())
    .then((data) => {
      ProduitValidData = data;
      // console.log(ProduitValidData);
    })
    .catch((err) => console.log("ereur:" + err));
};
// récupère et affiche le produit selectionné
const affichProduitValid = async () => {
  await RecupProduitValid();
  document.querySelector(".affichProduits").innerHTML = `
 <!--________________container produit_______________________-->
  <div class="container-produit">
  <!--________________bloc produit_______________________-->
 <div id="cam ${ProduitValidData._id}" class="bloc-produit">
     <h3 class="bloc-produit_title">${ProduitValidData.title}</h3>
   <img class="bloc-produit_img" src="${
     ProduitValidData.imageUrl
   }" alt="image produit ${ProduitValidData.title}"/> 
   <p class="bloc-produit_descript"> ${ProduitValidData.description}</p>
   <p class="bloc-produit_price">${ProduitValidData.price
     .toString()
     .replace(/0+$/, "")} Euros </p>
          </div>
  
  <!--________________button valider_______________________-->
  <button id="${
    ProduitValidData._id
  }" class="buttonValid">Ajouter au panier</button>
  </div>
  </div>
  `;

  ajoutPanier(ProduitValidData);
};

affichProduitValid();
//__________ on commence l'ajout dans le localstorage_____________
const ajoutPanier = () => {
  let buttonStorage = document.getElementById(ProduitValidData._id);

  buttonStorage.addEventListener("click", () => {
    // on verifie si il y a des produits dans le localstorage
    let produitTable = JSON.parse(localStorage.getItem("produit"));
    // on récupère l'option lentilles sélectionnée
    let selectopt = document.getElementById("lentilles");

    //on rajoute dans l'objet ProduitValidData deux éléments
    // le choix de la lentille et la quantité
    const fusionproduitlentilles = ProduitValidData;

    // si le tableau est vide
    if (produitTable == null) {
      // on crée un tableau vide
      produitTable = [];

      //on met dans le tableau le produit et option sélectionnée
      produitTable.push(fusionproduitlentilles);

      //on stock  dans le localstorage le produit sous forme de string
      localStorage.setItem("produit", JSON.stringify(produitTable));
      //---------essai-----------

      ajoutpanierQauntiteTotal();
    }
    // ____________si le tableau n'est pas vide___________________________
    else if (produitTable != null) {
      //--------première boucle----------------
      for (i = 0; i < produitTable.length; i++) {
        // _______on verifie si le produit dans le tableau (localstorage) est égal au produit (selectionné)
        //qu'il y à dans la boucle for ainsi que l'option lentilles
        if (
          produitTable[i]._id == ProduitValidData._id &&
          produitTable[i].lentillechoix == selectopt.value
        ) {
          // si le produit est le même on augmente la quantité____________________
          return (
            produitTable[i].quantite++,
            console.log("quantite++"),
            // on modifie le produit dans le localstorage et le transforme avec stringify
            // ici juste la quantité sera modifié
            localStorage.setItem("produit", JSON.stringify(produitTable)),
            // on le récupère du localstorage et le transforme en objet (parse) pour pouvoir l'afficher dans la page
            (produitTable = JSON.parse(localStorage.getItem("produit"))),
            ajoutpanierQauntiteTotal()
          );
        }
      }
      //--------deuxième boucle----------------
      // on vérifie si c'est le même produit mais cette fois avec une lentille différente
      // ou un id différent
      for (i = 0; i < produitTable.length; i++) {
        if (
          (produitTable[i]._id == ProduitValidData._id &&
            produitTable[i].lentillechoix != selectopt.value) ||
          produitTable[i]._id != ProduitValidData._id
        ) {
          return (
            produitTable.push(fusionproduitlentilles),
            localStorage.setItem("produit", JSON.stringify(produitTable)),
            (produitTable = JSON.parse(localStorage.getItem("produit"))),
            ajoutpanierQauntiteTotal()
          );
        }
      }
    }
  });
  // on va chercher la nouvelle valeur du tableau du localstorage
  return (produitTable = JSON.parse(localStorage.getItem("produit")));
};
//-----------afficher quantité panier dans bannière------------
ajoutpanierQauntiteTotal();
