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
    if (modale === null) return

    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))

    // Fermeture de la modale apres 500ms 
    window.setTimeout(function() {
        modale.style.display = "none"
        modale = null
    }, 400)
    
    modale.setAttribute("aria-hidden", "true")
    modale.removeAttribute("aria-modal")

    modale.removeEventListener("click", closeModale).removeEventListener("click", closeModale)
    modale.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation)
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