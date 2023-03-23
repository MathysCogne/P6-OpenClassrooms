////////////////////////////////////////////////////
////////////// GESTION BOITE MODALE ////////////////
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
    modale.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation)

    // Fermeture de la modale apres 500ms 
    window.setTimeout(function() {
        resetmodaleSectionProjets()
        modale.style.display = "none"
        modale = null
    }, 400)
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
////////////// GESTION TOKEN LOGIN /////////////////
////////////////////////////////////////////////////

// Récupération du token
const token = localStorage.getItem("token");
const AlredyLogged = document.querySelector(".js-alredy-logged");

adminPanel()

function adminPanel() {
    document.querySelectorAll(".admin__modifer").forEach(a => {
        console.log(a)
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



////////////////////////////////////////////////////
////////////// generationProjets Dans la modale ////
////////////////////////////////////////////////////
const modaleSectionProjets = document.querySelector(".js-admin-projets"); 

let dataAdmin;

const response = await fetch('http://localhost:5678/api/works'); 
dataAdmin = await response.json();

// Reset la section projets
function resetmodaleSectionProjets() {  
	modaleSectionProjets.innerHTML = "";
}

// Génère les projets dans la modale admin
function modaleProjets(dataAdmin) { 
    resetmodaleSectionProjets()
    for (let i = 0; i < dataAdmin.length; i++) {
        
        const div = document.createElement("div");
        div.classList.add("gallery__item-modale");
        modaleSectionProjets.appendChild(div);

        const img = document.createElement("img");
        img.src = dataAdmin[i].imageUrl;
        img.alt = dataAdmin[i].title;
        div.appendChild(img);

        const p = document.createElement("p");
        p.innerHTML = "Éditer";
        div.appendChild(p);
    }
}