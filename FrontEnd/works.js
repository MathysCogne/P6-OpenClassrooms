//////////////////////////////////////////////////////////////////
////////// recupération des données depuis l'API /////////////////
//////////////////////////////////////////////////////////////////
const sectionProjets = document.querySelector(".gallery"); 

// données de l'API pour les projets
let data;

const response = await fetch('http://localhost:5678/api/works'); 
data = await response.json();


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
    
    // Si pb avec la BDD, erreur
    if (data.length === 0 || data === undefined) { 
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerHTML = "Aucun projet à afficher <br><br>Toutes nos excuses pour la gêne occasionnée";
        sectionProjets.appendChild(p);
        return;
    }

    // Si id est null, on affiche tous les projets
    else if (id === null) {
        for (let i = 0; i < data.length; i++) {
            
            const figure = document.createElement("figure"); 
            sectionProjets.appendChild(figure);

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

    // Si id est 1, 2 ou 3, on affiche les projets selon leurs ID
    else if (id === 1 || id === 2 || id === 3) {
        const resultFilter = data.filter(data => data.categoryId == id); // filtre les données
        for (let i = 0; i < resultFilter.length; i++) {  // boucle sur les données en fonction du filtre
            
            const figure = document.createElement("figure"); 
            sectionProjets.appendChild(figure);

            const img = document.createElement("img");
            img.src = resultFilter[i].imageUrl;
            img.alt = resultFilter[i].title;
            figure.appendChild(img);

            const figcaption = document.createElement("figcaption");
            figcaption.innerHTML = resultFilter[i].title;
            figure.appendChild(figcaption);
        }
        return;
    }

    // sinon erreur
    else {
        console.log("ERREUR")
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerHTML = "Une erreur est survenue, veuillez réessayer <br><br>Toutes nos excuses pour la gêne occasionnée";
        sectionProjets.appendChild(p);
        return;
    }
}


//////////////////////////////////////////////////
////////////// FILTRAGE //////////////////////////
//////////////////////////////////////////////////
const btnAll = document.querySelector(".filter__btn-all");
const btnId1 = document.querySelector(".filter__btn-id1");
const btnId2 = document.querySelector(".filter__btn-id2");
const btnId3 = document.querySelector(".filter__btn-id3");

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