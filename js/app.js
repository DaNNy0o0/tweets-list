// ==============================================================
// ========================VARIABLES=============================

// Selectores
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

// ==============================================================
// ========================EVENT LISTENERS=============================
eventListeners();

function eventListeners() {
  // Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // Cuando el documento carga
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("Tweets")) || [];

    crearHTML();
  });
}

// ==============================================================
// ========================FUNCIONES=============================

function agregarTweet(e) {
  e.preventDefault();

  // Textarea donde el usuario introduce el tweet
  const tweet = document.querySelector("#tweet").value;

  if (tweet.length === 0) {
    mostrarError("El campo no puede estar vacío");

    return; // Evita que se siga ejecutando el código
  }

  // Añadir al array de tweets

  const tweetObj = {
    tweet,
    id: Date.now(),
  };

  tweets = [...tweets, tweetObj];

  // Una vez agregado al array de Tweets, creamos el html

  crearHTML();

  // Reiniciar el formulario
  formulario.reset();
}

// Mostrar el mensaje de error

function mostrarError(mensaje) {
  const mensajeError = document.createElement("P");
  mensajeError.textContent = mensaje;

  mensajeError.classList.add("error");

  formulario.appendChild(mensajeError);

  setTimeout(() => {
    formulario.removeChild(mensajeError);
  }, 3000);
}

// Mostrar listado de tweets

function crearHTML() {
  limpiarHtml();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // Agregar el boton de eliminar

      const btnEliminar = document.createElement("a");
      btnEliminar.textContent = "X";
      btnEliminar.classList.add("borrar-tweet");

      // Añadir funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // Crear el HTML

      // Crear LI
      const li = document.createElement("LI");

      // Añadir texto
      li.textContent = tweet.tweet;

      // Asignar el btn de eliminar
      li.appendChild(btnEliminar);

      // Agregar al listado

      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agregar los tweets al localStorage

function sincronizarStorage() {
  localStorage.setItem("Tweets", JSON.stringify(tweets));
}

// Eliminar tweets

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHTML();
}

// Limpiar HTML

function limpiarHtml() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
