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

// Gestion du Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 700); // Attend la fin de l'animation d'opacité
});

// CURSEUR PERSO
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursor-dot");

document.addEventListener("mousemove", (e) => {
  // Le point suit instantanément
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";

  // Le cercle a un petit délai (effet smooth)
  cursor.animate(
    {
      left: e.clientX + "px",
      top: e.clientY + "px",
    },
    { duration: 500, fill: "forwards" },
  );
});

// Agrandir le curseur sur les liens
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () =>
    cursor.classList.add("scale-150", "bg-brand-500/20"),
  );
  el.addEventListener("mouseleave", () =>
    cursor.classList.remove("scale-150", "bg-brand-500/20"),
  );
});

function copyIp() {
  const ip = "connect.aurorarp.fr"; // Mettez votre vraie IP ou DNS
  navigator.clipboard.writeText(ip);

  // Afficher le toast
  const toast = document.getElementById("toast");
  toast.classList.remove("translate-y-20", "opacity-0");

  // Cacher après 2 sec
  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 2000);
}
