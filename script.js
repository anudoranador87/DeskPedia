// =====================
// CONSTANTES
// =====================

const API_URL =
  "https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";

const UNSPLASH_KEY = "IHv1EVVYFUlVseCbLHAVSwGYpVuc5jMPgJi0_AWQv6o";

const CHIPS = [
  "Málaga",
  "Historia de Málaga",
  "Alcazaba de Málaga",
  "Museo Picasso Málaga",
  "Catedral de Málaga",
  "Caminito del Rey",
  "Costa del Sol",
  "Semana Santa de Málaga",
  "Feria de Agosto de Málaga",
  "Vino de Málaga",
  "El Pimpi",
  "Mercado de Atarazanas",
  "Cuevas de Nerja",
  "El Tintero Málaga",
  "Sierra de las Nieves",
  "Castillo de Colomares",
  "El Torcal de Antequera",
  "Plaza Mayor Málaga",
  "Cercanías Málaga",
];

// =====================
// ELEMENTOS DEL DOM
// =====================

const inputBusqueda = document.getElementById("search-input");
const btnBuscar = document.getElementById("btn-buscar");
const btnAleatorio = document.getElementById("btn-aleatorio");
const chipsContainer = document.getElementById("chips-container");
const listaResultados = document.getElementById("lista-resultados");
const resultadosLabel = document.getElementById("resultados-label");

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

// =====================
// CHIPS
// =====================

function renderizarChips() {
  CHIPS.forEach((chip) => {
    const chip1 = document.createElement("button");
    chip1.textContent = chip;
    chip1.addEventListener("click", () => {
      inputBusqueda.value = chip;
      buscarWikipedia(chip); // busca directamente al pulsar chip
    });
    chipsContainer.appendChild(chip1);
  });
}
// =====================
// BOTON ALEATORIO
// =====================
btnAleatorio.addEventListener("click", () => {
  const chip = CHIPS[Math.floor(Math.random() * CHIPS.length)];
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

renderizarChips();
