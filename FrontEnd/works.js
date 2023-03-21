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
            dataProjets(data)
        })
        .catch(error => console.error(error)); // Affiche les erreurs dans la console 
}

///////////////////////////////////////////////////////////////////////






function dataProjets(data) {
    console.log(data)
}