const alredyLoggedError = document.querySelector(".alredyLogged__error"); 
const loginEmailError = document.querySelector(".loginEmail__error"); 
const loginMdpError = document.querySelector(".loginMdp__error"); 

const email = document.getElementById("email");
const password = document.getElementById("password");

const submit = document.getElementById("submit");

alredyLogged();

// Si l'utilisateur est déjà connecté, on supprime le token
function alredyLogged() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");

        const p = document.createElement("p");
        p.innerHTML = "<br><br><br>Vous avez été déconnecté, veuillez vous reconnecter";
        alredyLoggedError.appendChild(p);
        return;
    }
}

// Au clic, on envoie les valeurs de connextion
submit.addEventListener("click", () => {
    let user = {
        email: email.value,
        password: password.value
    };
    login(user);
})

// Fonction de connexion
function login(id) {
    console.log(id);
    loginEmailError.innerHTML = "";
    loginMdpError.innerHTML = "";
    // véeification de l'email
    if (!id.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez entrer une addresse mail valide";
        loginEmailError.appendChild(p);
        return;
    }
    // vérifcation du mot de passe
    if (id.password.length < 5 && !id.password.match(/^[a-zA-Z0-9]+$/g)) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez entrer un mot de passe valide";
        loginMdpError.appendChild(p);
        return;
    }

    else {
    // verification de l'email et du mot de passe
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(id)
    })
    .then(response => response.json())
    .then(result => { 
        console.log(result);
        // Si couple email/mdp incorrect
        if (result.error || result.message) {
            const p = document.createElement("p");
            p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
            loginMdpError.appendChild(p);

        // Si couple email/mdp correct
        } else if (result.token) {
            localStorage.setItem("token", result.token);
            window.location.href = "index.html";
        }
    
    })
    // prevenir l'utilisateur en cas d'erreur
    
    .catch(error => 
        console.log(error));
}
}
