//////////////////////////////////////////////////////////////////
////////// recupération des données depuis l'API /////////////////
//////////////////////////////////////////////////////////////////
const sectionProjets = document.querySelector(".gallery"); 

// données de l'API pour les projets
let data;
try {
    const response = await fetch('http://localhost:5678/api/works'); 
    data = await response.json();
}
catch{
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerHTML = "Une erreur est survenue lors de la récupération des projets<br><br>Une tentative de reconnexion automatique auras lieu dans une minute<br><br><br><br>Si le problème persiste, veuillez contacter l'administrateur du site";
    sectionProjets.appendChild(p);
    await new Promise(resolve => setTimeout(resolve, 60000));
    window.location.href = "index.html";
}


generationProjets(data, null);


////////////////////////////////////////////////////
////////////// generationProjets() /////////////////
////////////////////////////////////////////////////

// Reset la section projets
function resetSectionProjets() {  
	sectionProjets.innerHTML = "";
}

// Génère les projets
function generationProjets(data, id) { 
    console.log(data, id)
    resetSectionProjets()

    // Filtre les résultats
    if ([1, 2, 3].includes(id)) {
        data = data.filter(data => data.categoryId == id);
    }

    if (data.length === 0 || data === undefined) { 
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerHTML = "Aucun projet à afficher <br><br>Toutes nos excuses pour la gêne occasionnée";
        sectionProjets.appendChild(p);
        return;
    }
    // Change la couleur du bouton en fonction du filtre
    document.querySelectorAll(".filter__btn").forEach(btn => {
        btn.classList.remove("filter__btn--active");})
    document.querySelector(`.filter__btn-id-${id}`).classList.add("filter__btn--active");

    // Génère les projets
    if (id === null || [1, 2, 3].includes(id)) {
        for (let i = 0; i < data.length; i++) {
            
            const figure = document.createElement("figure"); 
            sectionProjets.appendChild(figure);
            figure.classList.add(`js-projet-${data[i].id}`); // Ajoute l'id du projet pour le lien vers la modale lors de la supression 
            const img = document.createElement("img");
            img.src = data[i].imageUrl;
            img.alt = data[i].title;
            figure.appendChild(img);

            const figcaption = document.createElement("figcaption");
            figcaption.innerHTML = data[i].title;
            figure.appendChild(figcaption);
        }
        return;
    }
}


//////////////////////////////////////////////////
////////////// FILTRAGE //////////////////////////
//////////////////////////////////////////////////
const btnAll = document.querySelector(".filter__btn-id-null");
const btnId1 = document.querySelector(".filter__btn-id-1");
const btnId2 = document.querySelector(".filter__btn-id-2");
const btnId3 = document.querySelector(".filter__btn-id-3");

// Tous 
btnAll.addEventListener("click", () => {
    generationProjets(data, null);
})
// Objets
btnId1.addEventListener("click", () => {
    generationProjets(data, 1);
})
// Appartements
btnId2.addEventListener("click", () => {
    generationProjets(data, 2);
})
// Hôtels & restaurants
btnId3.addEventListener("click", () => {
    generationProjets(data, 3);
})