# DeskPedia 🗝️

> **La enciclopedia del recepcionista** · *The receptionist's encyclopedia*

---

## 🇪🇸 Español

### ¿Qué es DeskPedia?

DeskPedia es una guía de Málaga para recepcionistas de hotel, construida sobre la API pública de Wikipedia. Nace de un problema real: en recepción necesitas respuestas rápidas sobre monumentos, gastronomía, historia y cultura local para atender a huéspedes internacionales. Esta herramienta organiza esa consulta de forma rápida y enfocada, con chips predefinidos sobre los temas que más preguntan los turistas en Málaga.

### ¿Por qué lo construí?

Trabajé más de 8 años en recepción hotelera en España y Reino Unido. Una de las habilidades más valoradas en ese puesto es saber responder a cualquier pregunta de un huésped — desde el horario de un museo hasta la historia de un barrio. Este proyecto une mi experiencia profesional anterior con las tecnologías que estoy aprendiendo: `async/await`, `fetch` y la API de Wikipedia.

### Funcionalidades

- Búsqueda en tiempo real contra la API de Wikipedia en español
- 19 chips predefinidos sobre Málaga — Alcazaba, Picasso, Caminito del Rey, El Pimpi, Cuevas de Nerja, El Torcal, Sierra de las Nieves y más
- Cuatro estados de UI: vacío, cargando, resultados y error — con skeleton loaders
- Snippet con palabras clave resaltadas
- Enlace directo al artículo completo en Wikipedia
- Header con silueta SVG de la Alcazaba y frase poética
- Diseño accesible con `aria-live`, `aria-label` y `sr-only`
- Responsive — funciona en móvil y escritorio

### Tecnologías

- HTML5 semántico
- CSS3 (custom properties, animaciones, responsive)
- JavaScript vanilla — sin frameworks
- API pública de Wikipedia (`es.wikipedia.org/w/api.php`)
- `async/await` + `try/catch`
- `innerHTML` para renderizar snippets con HTML

### Lo que aprendí construyendo esto

- Cómo conectar a una API externa con `fetch` y `async/await`
- Gestión de estados de UI sin framework — el patrón `mostrarEstado()`
- Por qué `fetch` no lanza error en respuestas 4xx/5xx
- La diferencia entre `textContent` e `innerHTML` y cuándo usar cada uno
- Event delegation y creación dinámica de elementos del DOM
- Depuración real: un punto extra rompió todo el script (línea 102)

### Estado del proyecto

- [x] Estructura HTML semántica
- [x] CSS con diseño editorial — tipografía Playfair Display, paleta terracota
- [x] Lógica JavaScript + fetch contra API real
- [x] 19 chips predefinidos sobre Málaga
- [x] Header con silueta SVG de la Alcazaba
- [ ] Foto de fondo generada con IA
- [ ] Historial de búsquedas en localStorage
- [ ] Botón artículo aleatorio
- [ ] Despliegue en GitHub Pages

---

## 🇬🇧 English

### What is DeskPedia?

DeskPedia is a Málaga guide for hotel receptionists, built on the public Wikipedia API. It comes from a real need: at reception, you need quick answers about monuments, gastronomy, history, and local culture to assist international guests. The tool includes predefined chips covering the topics tourists ask about most in Málaga.

### Why I built it

I worked 8+ years in hotel reception in Spain and the UK. One of the most valued skills in that role is being able to answer any guest question — from museum opening hours to a neighbourhood's history. This project connects my previous professional experience with the technologies I'm currently learning: `async/await`, `fetch`, and the Wikipedia API.

### Features

- Real-time search against the Spanish Wikipedia API
- 19 predefined chips about Málaga — Alcazaba, Picasso, Caminito del Rey, El Pimpi, Nerja Caves, El Torcal, Sierra de las Nieves and more
- Four UI states: empty, loading, results and error — with skeleton loaders
- Snippet with highlighted keywords
- Direct link to the full Wikipedia article
- Header with Alcazaba SVG silhouette and poetic tagline
- Accessible UI with `aria-live`, `aria-label` and `sr-only`
- Responsive — works on mobile and desktop

### Technologies

- Semantic HTML5
- CSS3 (custom properties, animations, responsive)
- Vanilla JavaScript — no frameworks
- Wikipedia public API (`es.wikipedia.org/w/api.php`)
- `async/await` + `try/catch`
- `innerHTML` for rendering snippets with HTML

### What I learned building this

- How to connect to an external API using `fetch` and `async/await`
- Managing UI states without a framework — the `mostrarEstado()` pattern
- Why `fetch` doesn't throw on 4xx/5xx responses
- The difference between `textContent` and `innerHTML` and when to use each
- Event delegation and dynamic DOM element creation
- Real debugging: a stray dot broke the entire script (line 102)

### Project status

- [x] Semantic HTML structure
- [x] CSS with editorial design — Playfair Display typography, terracotta palette
- [x] JavaScript logic + fetch against real API
- [x] 19 predefined chips about Málaga
- [x] Header with Alcazaba SVG silhouette
- [ ] AI-generated background photo
- [ ] Search history in localStorage
- [ ] Random article button
- [ ] Deploy to GitHub Pages

---

## Autor · Author

**Jose María Aparicio** · [@anudoranador87](https://github.com/anudoranador87)

Málaga, España · Career changer: Hospitality Management → Frontend Development

---

*Datos de Wikipedia bajo licencia Creative Commons CC BY-SA · Wikipedia data under Creative Commons CC BY-SA license*