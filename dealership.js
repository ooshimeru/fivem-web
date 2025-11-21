/* dealership.js - Logique du concessionnaire Aurora RP */

// Base de données des véhicules (Sélection représentative)
const vehicles = [
  // --- SPORTIVES ---
  {
    id: 1,
    name: "Grotti Itali GTO",
    category: "sport",
    price: 1965000,
    image: "images/cars/Grotti_Itali_GTO.png",
    stats: { speed: 95, accel: 98, handling: 88, braking: 80 },
  },
  {
    id: 2,
    name: "Ocelot Pariah",
    category: "sport",
    price: 1420000,
    image: "images/cars/Ocelot_Pariah.png",
    stats: { speed: 100, accel: 85, handling: 75, braking: 70 },
  },
  {
    id: 3,
    name: "Pfister Comet S2",
    category: "sport",
    price: 1878000,
    image: "images/cars/Pfister_Comet_S2.png",
    stats: { speed: 88, accel: 90, handling: 92, braking: 85 },
  },
  {
    id: 4,
    name: "Dinka Jester RR",
    category: "sport",
    price: 1970000,
    image: "images/cars/Dinka_Jester_RR.jpeg",
    stats: { speed: 89, accel: 88, handling: 90, braking: 82 },
  },

  // --- LUXE ---
  {
    id: 5,
    name: "Pegassi Ignus",
    category: "luxe",
    price: 2765000,
    image: "images/cars/Pegassi_Ignus.jpeg",
    stats: { speed: 96, accel: 94, handling: 95, braking: 88 },
  },
  {
    id: 6,
    name: "Truffade Thrax",
    category: "luxe",
    price: 2325000,
    image: "images/cars/Truffade_Thrax.jpeg",
    stats: { speed: 93, accel: 92, handling: 90, braking: 90 },
  },
  {
    id: 7,
    name: "Dewbauchee Champion",
    category: "luxe",
    price: 2995000,
    image: "images/cars/Dewbauchee_Champion.jpeg",
    stats: { speed: 90, accel: 88, handling: 85, braking: 80 },
  },
  {
    id: 8,
    name: "Benefactor Krieger",
    category: "luxe",
    price: 2875000,
    image: "images/cars/Benefactor_Krieger.jpeg",
    stats: { speed: 98, accel: 99, handling: 98, braking: 95 },
  },

  // --- SUV ---
  {
    id: 9,
    name: "Pegassi Toros",
    category: "suv",
    price: 498000,
    image: "images/cars/Pegassi_Toros.jpeg",
    stats: { speed: 85, accel: 80, handling: 70, braking: 65 },
  },
  {
    id: 10,
    name: "Gallivanter Baller ST",
    category: "suv",
    price: 890000,
    image: "images/cars/Gallivanter_Baller_ST.jpeg",
    stats: { speed: 75, accel: 70, handling: 65, braking: 60 },
  },
  {
    id: 11,
    name: "Pfister Astron",
    category: "suv",
    price: 1580000,
    image: "images/cars/Pfister_Astron.jpeg",
    stats: { speed: 82, accel: 85, handling: 78, braking: 72 },
  },
  {
    id: 12,
    name: "Ubermacht Rebla GTS",
    category: "suv",
    price: 1175000,
    image: "images/cars/Ubermacht_Rebla_GTS.jpeg",
    stats: { speed: 80, accel: 82, handling: 75, braking: 70 },
  },

  // --- MOTOS ---
  {
    id: 13,
    name: "Nagasaki Shinobi",
    category: "moto",
    price: 2480000,
    image: "images/cars/Nagasaki_Shinobi.jpeg",
    stats: { speed: 96, accel: 98, handling: 85, braking: 70 },
  },
  {
    id: 14,
    name: "Shitzu Hakuchou Drag",
    category: "moto",
    price: 976000,
    image: "images/cars/Shitzu_Hakuchou_Drag.jpeg",
    stats: { speed: 98, accel: 100, handling: 60, braking: 65 },
  },
  {
    id: 15,
    name: "Pegassi Bati 801",
    category: "moto",
    price: 15000,
    image: "images/cars/Pegassi_Bati_801.jpeg",
    stats: { speed: 85, accel: 80, handling: 80, braking: 70 },
  },
  {
    id: 16,
    name: "Western Reever",
    category: "moto",
    price: 1900000,
    image: "images/cars/Western_Reever.jpeg",
    stats: { speed: 90, accel: 92, handling: 75, braking: 60 },
  },
];

const grid = document.getElementById("vehicle-grid");
const buttons = document.querySelectorAll(".filter-btn");

// Formateur de prix (ex: 1 000 000 $)
const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

// Générateur de carte HTML
const createCard = (v) => {
  return `
  <div class="group relative rounded-xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-brand-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300"
       data-tilt
       data-tilt-max="15"
       data-tilt-speed="400"
       data-tilt-glare
       data-tilt-max-glare="0.3"
       data-tilt-scale="1.02">

        <!-- Image Container -->
        <div class="relative h-48 overflow-hidden">
            <img src="${v.image}" alt="${v.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">

            <!-- Badge Catégorie -->
            <div class="absolute top-3 left-3 px-2 py-1 bg-gray-950/80 backdrop-blur-md border border-gray-700 rounded text-xs font-bold text-white uppercase">
                ${v.category}
            </div>
        </div>

        <!-- Info de base (visible par défaut) -->
        <div class="p-5">
            <h3 class="text-xl font-display font-bold text-white mb-1">${v.name}</h3>
            <p class="text-brand-400 font-bold text-lg">${formatPrice(v.price)}</p>
        </div>

        <!-- OVERLAY STATS (Visible au survol uniquement) -->
        <div class="absolute inset-0 bg-gray-950/90 backdrop-blur-sm flex flex-col justify-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 class="text-center font-display font-bold text-white mb-4 tracking-widest border-b border-brand-500 pb-2 w-fit mx-auto">PERFORMANCES</h4>

            <div class="space-y-3 text-sm">
                <!-- Vitesse -->
                <div>
                    <div class="flex justify-between text-gray-400 text-xs mb-1"><span>Vitesse</span><span>${v.stats.speed}/100</span></div>
                    <div class="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"><div class="bg-brand-500 h-full rounded-full" style="width: ${v.stats.speed}%"></div></div>
                </div>
                <!-- Accélération -->
                <div>
                    <div class="flex justify-between text-gray-400 text-xs mb-1"><span>Accélération</span><span>${v.stats.accel}/100</span></div>
                    <div class="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"><div class="bg-purple-400 h-full rounded-full" style="width: ${v.stats.accel}%"></div></div>
                </div>
                <!-- Maniabilité -->
                <div>
                    <div class="flex justify-between text-gray-400 text-xs mb-1"><span>Maniabilité</span><span>${v.stats.handling}/100</span></div>
                    <div class="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"><div class="bg-blue-500 h-full rounded-full" style="width: ${v.stats.handling}%"></div></div>
                </div>
                <!-- Freinage -->
                <div>
                    <div class="flex justify-between text-gray-400 text-xs mb-1"><span>Freinage</span><span>${v.stats.braking}/100</span></div>
                    <div class="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"><div class="bg-red-500 h-full rounded-full" style="width: ${v.stats.braking}%"></div></div>
                </div>
            </div>

            <button class="mt-6 w-full py-2 bg-brand-600 text-white font-bold text-xs uppercase rounded hover:bg-brand-500 transition-colors">
                Voir en jeu
            </button>
        </div>
    </div>
    `;
};

// Fonction d'affichage
window.filterVehicles = (category) => {
  // 1. Gestion des boutons actifs (Code existant)
  buttons.forEach((btn) => {
    btn.classList.remove(
      "active",
      "bg-brand-600",
      "text-white",
      "border-brand-500",
      "shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    );
    btn.classList.add("bg-gray-900", "text-gray-400", "border-gray-800");

    if (btn.getAttribute("onclick").includes(category)) {
      btn.classList.remove("bg-gray-900", "text-gray-400", "border-gray-800");
      btn.classList.add(
        "active",
        "bg-brand-600",
        "text-white",
        "border-brand-500",
        "shadow-[0_0_15px_rgba(168,85,247,0.4)]",
      );
    }
  });

  // 2. Filtrage des données (Code existant)
  grid.innerHTML = "";
  const filtered =
    category === "all"
      ? vehicles
      : vehicles.filter((v) => v.category === category);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center text-gray-500 py-12">Aucun véhicule dans cette catégorie pour le moment.</div>`;
    return;
  }

  // 3. Injection HTML (Code existant)
  filtered.forEach((v) => {
    grid.innerHTML += createCard(v);
  });

  // --- NOUVEAU : Ré-initialiser VanillaTilt sur les nouvelles cartes ---
  // On vérifie si VanillaTilt est chargé pour éviter les erreurs
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.02,
    });
  }
};

// Init
document.addEventListener("DOMContentLoaded", () => filterVehicles("all"));

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
