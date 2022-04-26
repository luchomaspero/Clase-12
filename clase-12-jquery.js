// Para usar referencias de jquery en consola tengo que usar el comando "npm i --save-dev @types/jquery"

/// <reference types="jquery" />

// en js moderno usamos: const $header = document.querySelector("h1"); En jQuery =>

const $header = $("h1");

// $header.textContent = "Clase 12!" =>
$header.text("Clase 12!");

console.log($header.text())

// const $elementos = document.querySelectorAll("#lista li")
const $elementos = $("#lista li")

//ARROW FUNCTION: Cuidado, si yo hago referencia con "this" siempre voy a estar hablando del padre (la window),
//si no uso AF voy a hablar del elemento seleccionado (clickeado por ejemplo)

$elementos.click(() => {
    console.log(this)
})


// Promesas https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

/*
//Web APIs
$.ajax({
  method: "GET",
  url: "https://api.exchangeratesapi.io/latest",
  success: respuesta => {
    // console.log("respuesta de exchangeratesapi.io", respuesta);
    // $("#resultado").text(JSON.stringify(respuesta));
  }
  //async: false //al descomentar esta línea, nada se ejecuta hasta que esta llamada termine.
});

console.log("Esto pasa antes que la respuesta de $.ajax!");

//fetch API: 
//usa promesas
fetch("https://api.exchangeratesapi.io/latest")
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    $("h1").text(
      `Cambios del día ${respuestaJSON.date} en base ${respuestaJSON.base}`
    );

    $("ul").html('');

    Object.keys(respuestaJSON.rates).forEach(moneda => {
      $("ul").append($(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>`));
    });
  })
  .catch(error => console.error("FALLÓ", error));

console.log("Esto pasa antes que la respuesta de fetch!");
*/

// https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Usar_promesas
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise

// EJEMPLO DE PROMESAS

function verificarMayorDeEdad(edadUsuario) {
    return new Promise(function(resolve, reject) {
        console.log("Verificando en un proceso largo hipotético...")

        setTimeout(function () { // || el setTimeout es solo para simular un proceso largo hipotético ||
            if(edadUsuario >= 18){
                resolve("era mayor de edad")
            } else {
                reject("era menor de edad")
            }
        }, 5000)
    })
}

const edad = 11

verificarMayorDeEdad(edad)
    .then(mensaje => console.log(mensaje))
    .catch(error => console.error(error))