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

// =====================
// MOSTRAR ESTADO
// =====================

function mostrarEstado(estado) {
  const estados = ["vacio", "cargando", "error", "sin-resultados", "resultados"];
  estados.forEach(est => {
    const el = document.getElementById("estado-" + est);
    if (el) el.hidden = true;
  });

  const elMostrar = document.getElementById("estado-" + estado);
  if (elMostrar) {
    elMostrar.hidden = false;
    // Accesibilidad: Notificar a lectores de pantalla sobre cambios de estado
    elMostrar.setAttribute("role", "status");
  }
}

// =====================
// CHIPS
// =====================

function renderizarChips() {
  chipsContainer.innerHTML = "";
  CHIPS.forEach((chip) => {
    const chipBtn = document.createElement("button");
    chipBtn.textContent = chip;
    chipBtn.classList.add("chip-btn");
    chipBtn.setAttribute("aria-label", `Buscar información sobre ${chip}`);
    
    chipBtn.addEventListener("click", () => {
      inputBusqueda.value = chip;
      buscarWikipedia(chip);
    });
    chipsContainer.appendChild(chipBtn);
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
  const query = termino.trim();
  if (!query) return;

  mostrarEstado("cargando");
  
  try {
    const respuesta = await fetch(API_URL + encodeURIComponent(query));
    
    if (!respuesta.ok) {
      throw new Error(`Error de red: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    
    if (!data.query || !data.query.search) {
      mostrarEstado("sin-resultados");
      return;
    }

    const resultados = data.query.search;
    
    if (resultados.length === 0) {
      mostrarEstado("sin-resultados");
    } else {
      mostrarResultados(resultados);
    }
  } catch (error) {
    console.error("Error al buscar en Wikipedia:", error);
    mostrarEstado("error");
    const errorMsg = document.querySelector("#estado-error p");
    if (errorMsg) errorMsg.textContent = "Hubo un problema al conectar con Wikipedia. Inténtalo de nuevo.";
  }
}

// =====================
// MOSTRAR RESULTADOS
// =====================

async function mostrarResultados(resultados) {
  listaResultados.innerHTML = "";
  mostrarEstado("resultados");

  // Usamos Promise.all para manejar las peticiones de Unsplash de forma más eficiente
  const fragment = document.createDocumentFragment();

  for (const obj of resultados) {
    const contenedor = document.createElement("article");
    contenedor.classList.add("resultado-card");
    
    const titulo = document.createElement("h3");
    titulo.classList.add("resultado-titulo");
    titulo.textContent = obj.title;

    const snippet = document.createElement("p");
    snippet.classList.add("resultado-snippet");
    snippet.innerHTML = obj.snippet + "...";

    const leerMas = document.createElement("a");
    leerMas.href = `https://es.wikipedia.org/wiki/?curid=${obj.pageid}`;
    leerMas.textContent = "Leer más en Wikipedia →";
    leerMas.target = "_blank";
    leerMas.rel = "noopener noreferrer";
    leerMas.classList.add("resultado-link");
    leerMas.setAttribute("aria-label", `Leer más sobre ${obj.title} en Wikipedia`);

    // Intento de obtener imagen de Unsplash
    try {
      const fotoRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(obj.title)}&per_page=1`,
        { 
          headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
          signal: AbortSignal.timeout(3000) // Timeout de 3s para no bloquear la UI
        }
      );
      
      if (fotoRes.ok) {
        const fotoData = await fotoRes.json();
        if (fotoData.results && fotoData.results.length > 0) {
          const img = document.createElement("img");
          img.src = fotoData.results[0].urls.small;
          img.alt = `Imagen representativa de ${obj.title}`;
          img.classList.add("resultado-img");
          img.loading = "lazy"; // Performance: Lazy loading nativo
          contenedor.appendChild(img);
        }
      }
    } catch (error) {
      console.warn(`No se pudo cargar imagen para ${obj.title}:`, error);
    }

    contenedor.appendChild(titulo);
    contenedor.appendChild(snippet);
    contenedor.appendChild(leerMas);
    fragment.appendChild(contenedor);
  }
  
  listaResultados.appendChild(fragment);
}

// =====================
// EVENTOS
// =====================

btnBuscar.addEventListener("click", () => {
  buscarWikipedia(inputBusqueda.value);
});

inputBusqueda.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarWikipedia(inputBusqueda.value);
  }
});

// Inicialización
renderizarChips();
