// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for (let i=0; i< pieces.length; i++){

    let article = pieces[i];

    let sectionFiches = document.querySelector(".fiches");
    let pieceElement = document.createElement("article");

    let imageElement = document.createElement("img");
    imageElement.src = article.image;

    let nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;

    let prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    
    let categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

    let descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)";
    
    let disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerText = `${article.disponibilite ? "En stock" : "Rupture de stock"}`;
    // disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);

    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
}

// création des boutons de filtrages
let boutonTrier = document.querySelector(".btn-trier-bas")
boutonTrier.addEventListener("click", ()=>{
    console.log(pieces)
    let piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a,b)=>{
        return a.prix - b.prix
    });
    console.log(piecesOrdonnees)
});

let boutonTrierHaut = document.querySelector(".btn-trier-haut")
boutonTrierHaut.addEventListener("click", ()=>{
    console.log(pieces)
    let piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a,b)=>{
        return b.prix - a.prix
    });
    console.log(piecesOrdonnees)
});

let boutonFiltrer = document.querySelector(".btn-filtrer")
boutonFiltrer.addEventListener("click", ()=>{
    let piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= 35;
   
});
console.log(piecesFiltrees)
})


let boutonFiltrerDescription = document.querySelector(".btn-filtrer-description")
boutonFiltrerDescription.addEventListener("click", ()=>{
    let piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.description
        // if (pieces.description) {
        //     return pieces
        
});
console.log(piecesFiltrees)
});

// ajout de nouvelles cases
let noms = pieces.map(piece => piece.nom);
for (let i = pieces.length -1; i>= 0; i--){
    if (pieces[i].prix > 35){
        noms.splice(i,1)
    }
}
console.log(noms)

let abordablesElements = document.createElement('ul');
for (let i=0; i < noms.length; i++){
    let nomElement = document.createElement('li')
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
    console.log(noms)
}

document.querySelector('.abordables')
    .appendChild(abordablesElements)

let nomsDisponibles = pieces.map(piece => piece.nom);
let prixDisponibles = pieces.map(piece => piece.prix);

for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}

let disponiblesElement = document.createElement('ul');

for(let i=0 ; i < nomsDisponibles.length ; i++){
    let nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement);
}

document.querySelector('.disponibles').appendChild(disponiblesElement);