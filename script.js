// =====================
// CONSTANTES
// =====================

const API_URL =
  "https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";

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

//textContent es propiedad, no lleva parentesis
function renderizarChips() {
  // olvide la funcion en  el for Each

  CHIPS.forEach((chip) => {
    // mas limpio con arrow
    const chip1 = document.createElement("button");
    chip1.textContent = chip;
    chip1.addEventListener("click", () => {
      //Comillas al click siempre olvidadas
      inputBusqueda.value = chip;
    });
    chipsContainer.appendChild(chip1); // appendChild fuera, pues mete todo despues en el DOM
  });
}

//plato principal, buscar  con async await

async function buscarWikipedia(termino) {
  try {
    const respuesta = await fetch(
      "https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=" +
        termino
    );
    const data = await respuesta.json();
    const miArray = data.query.search;
    mostrarResultados(miArray); //definimos la funcion fuera
  } catch (error) {
    mostrarEstado("error");
    console.log("Error al buscar:", error);
  }
}

function mostrarResultados(resultados) {
  // faltaba function porque la estamos definiendo
  listaResultados.innerHTML = "";
  mostrarEstado("resultados");
  resultados.forEach((obj) => {
    const contenedor = document.createElement("div");
    const titulo = document.createElement("h3");
    const snippet = document.createElement("p");

    contenedor.classList.add("resultado-card");
    titulo.classList.add("resultado-titulo");
    snippet.classList.add("resultado-snippet");

    titulo.textContent = obj.title;
    snippet.innerHTML = obj.snippet;
    const leerMas = document.createElement("a");
    leerMas.href = "https://es.wikipedia.org/wiki/?curid=" + obj.pageid;
    leerMas.textContent = "Leer más en Wikipedia →";
    leerMas.target = "_blank";
    leerMas.classList.add("resultado-link");

    contenedor.appendChild(titulo);
    contenedor.appendChild(snippet);
    contenedor.appendChild(leerMas);
    contenedor.appendChild(titulo);
    contenedor.appendChild(snippet); // 2 llamadas
    listaResultados.appendChild(contenedor);
  });
}
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
