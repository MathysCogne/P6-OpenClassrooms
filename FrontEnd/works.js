///////////////////////////////////////////////////////////////////////
////////////// RECUPERATION DES DONEES DEPUIS l'API ///////////////////
///////////////////////////////////////////////////////////////////////
fetchProjets()

///////////////////////////////////////////////////////////////////////
// DONNES SECTION PROJETS 

// let arrayProjets = {}; 
function fetchProjets() { 
    fetch('http://localhost:5678/api/works') // Récupère les données de l'API
        .then(response => response.json()) // Transforme la réponse en JSON
        .then(data => {
            generationProjets(data)
        })
        .catch(error => console.error(error)); // Affiche les erreurs dans la console 
}

///////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////
////////////// GENERARTION ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
const sectionProjets = document.querySelector(".gallery"); 




///////////////////////////////////////////////////////////////////////
function resetSectionProjets() {  
	sectionProjets.innerHTML = "";
}

function generationProjets(data) {
    console.log(data)
    resetSectionProjets()

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
}


// <section id="portfolio">
// <h2>Mes Projets</h2>
// <div class="gallery">
//     <figure>
//         <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
//         <figcaption>Abajour Tahina</figcaption>
//     </figure>