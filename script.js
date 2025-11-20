// script.js

// Gestion du menu mobile
function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  // On bascule la classe translate-x-full pour faire glisser le menu
  if (menu.classList.contains("translate-x-full")) {
    menu.classList.remove("translate-x-full");
  } else {
    menu.classList.add("translate-x-full");
  }
}

// Changement de fond de la navbar au scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("py-2");
    navbar.classList.remove("py-4");
  } else {
    navbar.classList.add("py-4");
    navbar.classList.remove("py-2");
  }
});

// ... (Le code précédent du menu mobile reste ici) ...

/* ---------------------------------------------
   CONFIGURATION API FIVEM
   Remplacez 'votre_code' par votre ID CFX (ex: 5q8yvr)
--------------------------------------------- */
const SERVER_ID = "4kd5jv";

const updateServerStats = async () => {
  const statusEl = document.getElementById("server-status");
  const playerEl = document.getElementById("player-count");
  const maxPlayerEl = document.getElementById("max-players");
  const cfxIdEl = document.getElementById("cfx-id-display");
  const btnEl = document.getElementById("connect-btn");

  try {
    // Appel à l'API publique FiveM
    const response = await fetch(
      `https://servers-frontend.fivem.net/api/servers/single/${SERVER_ID}`,
    );

    if (!response.ok) throw new Error("Serveur introuvable");

    const data = await response.json();

    // Si le serveur est trouvé et contient des données
    if (data && data.Data) {
      const serverData = data.Data;

      // 1. Mise à jour du statut (En ligne)
      statusEl.innerHTML = `
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                <span class="text-green-400">EN LIGNE</span>
            `;

      // 2. Mise à jour des joueurs
      playerEl.innerText = serverData.clients;
      maxPlayerEl.innerText = serverData.sv_maxclients;

      // 3. Mise à jour de l'ID
      cfxIdEl.innerText = SERVER_ID.toUpperCase();

      // 4. Activation du bouton de connexion
      btnEl.href = `fivem://connect/cfx.re/join/${SERVER_ID}`;
      btnEl.classList.remove("opacity-50", "pointer-events-none");
      btnEl.innerHTML = `<i class="fas fa-play"></i> REJOINDRE`;
    }
  } catch (error) {
    console.error("Erreur récupération FiveM:", error);

    // Affichage Hors Ligne
    statusEl.innerHTML = `
            <span class="w-2 h-2 bg-red-500 rounded-full"></span>
            <span class="text-red-500">HORS LIGNE</span>
        `;
    playerEl.innerText = "0";
    maxPlayerEl.innerText = "0";
    cfxIdEl.innerText = SERVER_ID.toUpperCase();
  }
};

// Lancer la récupération au chargement de la page
document.addEventListener("DOMContentLoaded", updateServerStats);

// Actualiser toutes les 30 secondes
setInterval(updateServerStats, 30000);

// ... (votre code existant) ...

/* ---------------------------------------------
   ANIMATION AU SCROLL (REVEAL)
--------------------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optionnel : arrêter d'observer une fois affiché (pour ne le jouer qu'une fois)
        // revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // Déclenche quand 15% de l'élément est visible
  },
);

revealElements.forEach((el) => revealObserver.observe(el));
