///////////////////////////////////////////////////////////////////////
////////////// RECUPERATION DES DONEES DEPUIS l'API ///////////////////
///////////////////////////////////////////////////////////////////////

const sectionProjets = document.querySelector(".gallery"); 

// DONNES SECTION PROJETS 

let data;
const response = await fetch('http://localhost:5678/api/works'); 
data = await response.json();

console.log(">>>>>>>>>>>>>> DEBUG DATA <<<<<<<<<<<<<<<<");
console.log(data);

generationProjets(data, null);

////////////////////////////////////////////////////
////////////// GENERARTION /////////////////////////
////////////////////////////////////////////////////

// Reset la section des projets
function resetSectionProjets() {  
	sectionProjets.innerHTML = "";
}

// Génère les projets
function generationProjets(data, id) { 
    console.log(data, id)
    resetSectionProjets()

    if (data.length === 0) { 
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerHTML = "Aucun projet à afficher <br><br>Toutes nos excuses pour la gêne occasionnée";
        sectionProjets.appendChild(p);
        return;
    }
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
    // else if (id === 1) {
    //     console.log("DEBUG id1")
    //     for (let i = 0; i < data.length; i++) { 
    //         if (data[i].categoryId === 1) {
    //             const figure = document.createElement("figure"); 
    //             sectionProjets.appendChild(figure);

    //             const img = document.createElement("img");
    //             img.src = data[i].imageUrl;
    //             img.alt = data[i].title;
    //             figure.appendChild(img);

    //             const figcaption = document.createElement("figcaption");
    //             figcaption.innerHTML = data[i].title;
    //             figure.appendChild(figcaption);
    //         }
    //     }
    //     return;
    // }
    // else if (id === 2) {
    //     console.log("DEBUG id1")
    //     for (let i = 0; i < data.length; i++) { 
    //         if (data[i].categoryId === 2) {
    //             const figure = document.createElement("figure"); 
    //             sectionProjets.appendChild(figure);

    //             const img = document.createElement("img");
    //             img.src = data[i].imageUrl;
    //             img.alt = data[i].title;
    //             figure.appendChild(img);

    //             const figcaption = document.createElement("figcaption");
    //             figcaption.innerHTML = data[i].title;
    //             figure.appendChild(figcaption);
    //         }
    //     }
    // }
    // else if (id === 3) {
    //     console.log("DEBUG id1")
    //     for (let i = 0; i < data.length; i++) { 
    //         if (data[i].categoryId === 3) {
    //             const figure = document.createElement("figure"); 
    //             sectionProjets.appendChild(figure);

    //             const img = document.createElement("img");
    //             img.src = data[i].imageUrl;
    //             img.alt = data[i].title;
    //             figure.appendChild(img);

    //             const figcaption = document.createElement("figcaption");
    //             figcaption.innerHTML = data[i].title;
    //             figure.appendChild(figcaption);
    //         }
    //     }
    // } 
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
    console.log("click sur btnAll");
    generationProjets(data, null);
})
// Objets
btnId1.addEventListener("click", () => {
    console.log("click sur btnId1");
    generationProjets(data, 1);
})
// Appartements
btnId2.addEventListener("click", () => {
    console.log("click sur btnId2");
    generationProjets(data, 2);
})
// Hôtels & restaurants
btnId3.addEventListener("click", () => {
    console.log("click sur btnId3");
    generationProjets(data, 3);
})