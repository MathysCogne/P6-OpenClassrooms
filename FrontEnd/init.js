let arrayProjets;
// RECUPERATION DES DONNEES DE L'API
fetch('http://localhost:5678/api/works') // Récupère les données de l'API
.then(response => response.json()) // Transforme la réponse en JSON


.then(data => { // On récupère les données
    arrayProjets = data; // On stocke les données dans un tableau
    console.log(arrayProjets);  // On affiche les données dans la console
})



.catch(error => console.error(error)); // Affiche les erreurs dans la console