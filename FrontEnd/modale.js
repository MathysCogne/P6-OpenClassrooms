// INDEX : 1- GESTION BOITE MODALE
//         2- GESTION TOKEN LOGIN
//         3- generationProjets Dans la modale
//         4- GESTION SUPPRESSION PROJET
//         5- GESTION AJOUT PROJET
//         6- GESTION AJOUT D'UN PROJET
////////////////////////////////////////////////////
// INDEX : 1-// GESTION BOITE MODALE ////////////////
////////////////////////////////////////////////////

let modale = null;

// Ouverture de la modale
const openModale = function(e) {
    e.preventDefault()
    modale = document.querySelector(e.target.getAttribute("href"))

    modale.style.display = null
    modale.removeAttribute("aria-hidden")
    modale.setAttribute("aria-modal", "true")

    modaleProjets(dataAdmin); // Génère les projets dans la modale admin
    deleteWork()
    // Ajout EventListener sur les boutons pour ouvrir la modale projet
    document.querySelectorAll(".js-modale-projet").forEach(a => {
        a.addEventListener("click", openModaleProjet)});

    // Apl fermeture modale
    modale.addEventListener("click", closeModale)
    modale.querySelector(".js-modale-close").addEventListener("click", closeModale)
    modale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)
};


//  Ferme la modale
const closeModale = function(e) {
    e.preventDefault()
    if (modale === null) return

    
    modale.setAttribute("aria-hidden", "true")
    modale.removeAttribute("aria-modal")

    modale.querySelector(".js-modale-close").removeEventListener("click", closeModale)

    // Fermeture de la modale apres 400ms 
    window.setTimeout(function() {
        modale.style.display = "none"
        modale = null
        resetmodaleSectionProjets()
    }, 300)
};


// Définit la "border" du click pour fermer la modale
const stopPropagation = function(e) {
    e.stopPropagation()
};

// Selectionne les éléments qui ouvrent la modale
document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", openModale)
});

// Ferme la modale avec la touche echap
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
    }
});






////////////////////////////////////////////////////
// INDEX : 2-//// GESTION TOKEN LOGIN /////////////////
////////////////////////////////////////////////////

// Récupération du token
const token = localStorage.getItem("token");
const AlredyLogged = document.querySelector(".js-alredy-logged");



adminPanel()
// Gestion de l'affichage des boutons admin
function adminPanel() {
    document.querySelectorAll(".admin__modifer").forEach(a => {
        if (token === null) {
            return;
        }
        else {
            a.removeAttribute("aria-hidden")
            a.removeAttribute("style")
            AlredyLogged.innerHTML = "deconnexion";
        }
    });
}







/////////////////////////////////////////////////////
// INDEX : 3-///// generationProjets Dans la modale /
/////////////////////////////////////////////////////
const modaleSectionProjets = document.querySelector(".js-admin-projets"); 

let dataAdmin;

// Reset la section projets
function resetmodaleSectionProjets() {  
	modaleSectionProjets.innerHTML = "";
}

// Génère les projets dans la modale admin
async function modaleProjets(dataAdmin) { 
    const response = await fetch('http://localhost:5678/api/works'); 
    dataAdmin = await response.json();
    resetmodaleSectionProjets()
    for (let i = 0; i < dataAdmin.length; i++) {
        
        const div = document.createElement("div");
        div.classList.add("gallery__item-modale");
        modaleSectionProjets.appendChild(div);

        const img = document.createElement("img");
        img.src = dataAdmin[i].imageUrl;
        img.alt = dataAdmin[i].title;
        div.appendChild(img);

        const a = document.createElement("a");
        div.appendChild(a);
        a.setAttribute("href", "#")
        a.classList.add(dataAdmin[i].id, "js-delete-work");

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can"); 
        a.appendChild(icon);

        const p = document.createElement("p");
        p.innerHTML = "Éditer";
        div.appendChild(p);
    }
}







////////////////////////////////////////////////////////////
// INDEX : 4-// GESTION SUPPRESSION D'UN PROJET /////////////
////////////////////////////////////////////////////////////

// Event listener sur les boutons supprimer par apport a leur id
function deleteWork() {
    let btnDelete = document.querySelectorAll(".js-delete-work");
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", deleteProjets);
    }
}


// Supprimer le projet
async function deleteProjets() {
    console.log("DEBUG DEBUT DE FUNCTION SUPRESSION")
    console.log(this.classList[0])
    console.log(token)

    await fetch(`http://localhost:5678/api/works/${this.classList[0]}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`},
    })

    .then (response => {
        console.log(response)
        // Token good
        if (response.status === 204) {
            console.log("DEBUG SUPPRESION DU PROJET" + this.classList[0])
            refreshPage(this.classList[0])
        }
        // Token inorrect
        else if (response.status === 401) {
            alert("Vous n'êtes pas autorisé à supprimer ce projet, merci de vous connecter avec un compte valide")
            window.location.href = "login.html";
        }
    })
    .catch (error => {
        console.log(error)
    })
}

// Rafraichit les projets sans recharger la page
async function refreshPage(i){
    const response = await fetch('http://localhost:5678/api/works'); 
    dataAdmin = await response.json();
    modaleProjets(dataAdmin); // Re lance une génération des projets dans la modale admin
    deleteWork() // Re Event listener sur les boutons supprimer
    
    // supprime le projet de la page d'accueil
    const projet = document.querySelector(`.js-projet-${i}`);
    projet.style.display = "none";
}










////////////////////////////////////////////////////
// INDEX : 5-/ GESTION BOITE MODALE AJOUT PROJET ///
////////////////////////////////////////////////////
let modaleProjet = null;

// Ouverture de la modale projet

const openModaleProjet = function(e) {
    e.preventDefault()
    modaleProjet = document.querySelector(e.target.getAttribute("href"))

    modaleProjet.style.display = null
    modaleProjet.removeAttribute("aria-hidden")
    modaleProjet.setAttribute("aria-modal", "true")

    // Apl fermeture modale
    modaleProjet.addEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-close").addEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)

    modaleProjet.querySelector(".js-modale-return").addEventListener("click", backToModale)
};


// Fermeture de la modale projet

const closeModaleProjet = function(e) {
    if (modaleProjet === null) return

    modaleProjet.setAttribute("aria-hidden", "true")
    modaleProjet.removeAttribute("aria-modal")

    modaleProjet.querySelector(".js-modale-close").removeEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation)

    modaleProjet.style.display = "none"
    modaleProjet = null
    
    closeModale(e)
};

// fermerture de la modale avec la touche echap
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModaleProjet(e)
    }
});



// Retour au modale admin
const backToModale = function(e) {
    e.preventDefault()
    modaleProjet.style.display = "none"
    modaleProjet = null
    modaleProjets(dataAdmin)
};





////////////////////////////////////////////////////
// INDEX : 6-/ GESTION BAJOUT D'UN PROJET ///
////////////////////////////////////////////////////

const btnAjouterProjet = document.querySelector(".js-add-work");
btnAjouterProjet.addEventListener("click", addWork);

async function addWork(event) {
    event.preventDefault();

    const title = document.querySelector(".js-title").value;
    const categoryId = document.querySelector(".js-categoryId").value;
    const image = document.querySelector(".js-image").files[0];


    if (title === "" || categoryId === "" || image === undefined) {
        alert("Merci de remplir tous les champs");
        return;
    } else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
        alert("Merci de choisir une catégorie valide");
        return;
        } else {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", categoryId);
        formData.append("image", image);

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },

            body: formData,
        });

        if (response.status === 201) {
            console.log("Projet ajouté avec succès");
            modaleProjets(dataAdmin);
            backToModale(event);

        } else if (response.status === 400) {
            alert("Merci de remplir tous les champs");
        } else if (response.status === 500) {
            alert("Erreur serveur");
        } else if (response.status === 401) {
            alert("Vous n'êtes pas autorisé à ajouter un projet");
            window.location.href = "login.html";
    }}

    catch (error) {
        console.log(error);
    
}}}
