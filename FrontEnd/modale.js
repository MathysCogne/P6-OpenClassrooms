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
// const test = document.querySelectorAll(".admin__modifer");
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
            console.log("teszgdiqdiqzbdihzduizqdhu")
        }
    });
}
    
// Si le token existe, on affiche le bouton de déconnexion

