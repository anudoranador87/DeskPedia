// =====================
// CONSTANTES
// =====================

const API_URL =
  "https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";

const UNSPLASH_KEY = "IHv1EVVYFUlVseCbLHAVSwGYpVuc5jMPgJi0_AWQv6o";

const CATEGORIES = [
  {
    name: "Museos",
    items: [
      "Museo Picasso Málaga",
      "Museo Carmen Thyssen",
      "CAC Málaga",
      "Museo Automovilístico Málaga",
      "Museo del Vidrio y Cristal",
      "Museo de Málaga",
    ],
  },
  {
    name: "Gastronomía",
    items: [
      "Tapas Málaga",
      "El Pimpi",
      "Mercado de Atarazanas",
      "Chiringuito La Moraga",
      "Restaurante José Carlos García",
      "Casa Lola Málaga",
    ],
  },
  {
    name: "Tours",
    items: [
      "Tour a pie Málaga",
      "Tour gastronómico Málaga",
      "Ruta de tapas",
      "Tour en segway Málaga",
      "Excursión a Ronda",
      "Ruta de museos",
    ],
  },
  {
    name: "Lugares",
    items: [
      "Alcazaba de Málaga",
      "Catedral de Málaga",
      "Caminito del Rey",
      "Playa de la Malagueta",
      "Castillo de Gibralfaro",
      "Plaza de la Merced",
    ],
  },
];

let categoriaActiva = CATEGORIES[0].name;

// =====================
// ELEMENTOS DEL DOM
// =====================

const inputBusqueda = document.getElementById("search-input");
const btnBuscar = document.getElementById("btn-buscar");
const btnAleatorio = document.getElementById("btn-aleatorio");
const categoryButtons = document.getElementById("category-buttons");
const chipsContainer = document.getElementById("chips-container");
const listaResultados = document.getElementById("lista-resultados");
const resultadosLabel = document.getElementById("resultados-label");

// =====================
// CATEGORÍAS
// =====================

function renderizarCategorias() {
  categoryButtons.innerHTML = "";

  CATEGORIES.forEach((categoria) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = categoria.name;
    boton.classList.add("category-button");
    boton.setAttribute("role", "tab");
    boton.setAttribute(
      "aria-selected",
      categoriaActiva === categoria.name ? "true" : "false"
    );

    if (categoriaActiva === categoria.name) {
      boton.classList.add("is-active");
    }

    boton.addEventListener("click", () => {
      categoriaActiva = categoria.name;
      renderizarCategorias();
      renderizarChips(categoria.items);
    });

    categoryButtons.appendChild(boton);
  });
}

function renderizarChips(items) {
  chipsContainer.innerHTML = "";

  items.forEach((chip) => {
    const botonChip = document.createElement("button");
    botonChip.type = "button";
    botonChip.textContent = chip;
    botonChip.addEventListener("click", () => {
      inputBusqueda.value = chip;
      buscarWikipedia(chip);
    });
    chipsContainer.appendChild(botonChip);
  });
}

function obtenerChipsActivos() {
  const categoria = CATEGORIES.find((categoria) => categoria.name === categoriaActiva);
  return categoria ? categoria.items : CATEGORIES.flatMap((categoria) => categoria.items);
}

// =====================
// MOSTRAR ESTADO
// =====================

function mostrarEstado(estado) {
  document.getElementById("estado-vacio").hidden = true;
  document.getElementById("estado-cargando").hidden = true;
  document.getElementById("estado-error").hidden = true;
  document.getElementById("estado-sin-resultados").hidden = true;
  document.getElementById("estado-resultados").hidden = true;

  document.getElementById("estado-" + estado).hidden = false;
}

btnAleatorio.addEventListener("click", () => {
  const items = obtenerChipsActivos();
  const chip = items[Math.floor(Math.random() * items.length)];
  inputBusqueda.value = chip;
  buscarWikipedia(chip);
});
// =====================
// BUSCAR WIKIPEDIA
// =====================

async function buscarWikipedia(termino) {
  if (!termino.trim()) return; // evita búsquedas vacías
  mostrarEstado("cargando");   // feedback visual mientras espera
  try {
    const respuesta = await fetch(API_URL + termino);
    const data = await respuesta.json();
    const miArray = data.query.search;
    mostrarResultados(miArray);
  } catch (error) {
    mostrarEstado("error");
    console.log("Error al buscar:", error);
  }
}

// =====================
// MOSTRAR RESULTADOS
// =====================

async function mostrarResultados(resultados) {
  listaResultados.innerHTML = "";
  mostrarEstado("resultados");

  for (const obj of resultados) {
    const contenedor = document.createElement("div");
    const titulo = document.createElement("h3");
    const snippet = document.createElement("p");
    const leerMas = document.createElement("a");

    contenedor.classList.add("resultado-card");
    titulo.classList.add("resultado-titulo");
    snippet.classList.add("resultado-snippet");

    titulo.textContent = obj.title;
    snippet.innerHTML = obj.snippet;
    leerMas.href = "https://es.wikipedia.org/wiki/?curid=" + obj.pageid;
    leerMas.textContent = "Leer más en Wikipedia →";
    leerMas.target = "_blank";
    leerMas.classList.add("resultado-link");

    // Fetch a Unsplash
    try {
      const fotoRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${obj.title}&per_page=1`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
      );
      const fotoData = await fotoRes.json();

      if (fotoData.results.length > 0) {
        const img = document.createElement("img");
        img.src = fotoData.results[0].urls.small;
        img.alt = obj.title;
        img.classList.add("resultado-img");
        contenedor.appendChild(img); // imagen primero, arriba de la card
      }
    } catch (error) {
      console.log("Error Unsplash:", error);
    }

    contenedor.appendChild(titulo);
    contenedor.appendChild(snippet);
    contenedor.appendChild(leerMas);
    listaResultados.appendChild(contenedor);
  }
}

// =====================
// EVENTOS
// =====================

btnBuscar.addEventListener("click", () => {
  console.log("click detectado:", inputBusqueda.value);
  buscarWikipedia(inputBusqueda.value);
});

inputBusqueda.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarWikipedia(inputBusqueda.value);
    console.log("click detectado:", inputBusqueda.value);
  }
});

renderizarCategorias();
renderizarChips(obtenerChipsActivos());
