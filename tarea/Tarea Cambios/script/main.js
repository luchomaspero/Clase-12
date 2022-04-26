
const URL_api = 'https://api.frankfurter.app/latest'


const $form = $('#consultaDeCambio')[0]
const moneda = $form.monedaUsuario.value
const fecha = $form.fechaUsuario.value

try{
    fetch(URL_api)
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
      $("h1").text(`Cambios del día ${respuestaJSON.date} en base ${respuestaJSON.base}`);
      $("#fechaUsuario").val(respuestaJSON.date)
      $('#monedaUsuario').val(respuestaJSON.base)
      $("#fechaHoy").text(respuestaJSON.date)
      $('ul').html('')
      $('#resultado').addClass('oculto')

      Object.keys(respuestaJSON.rates).forEach(moneda => {
          $('ul').append($(`<li> ${moneda}: ${respuestaJSON.rates[moneda]}</li>`))
      })
      document.querySelector("#pares").textContent = (Object.keys(respuestaJSON.rates) + ",EUR")
      
    })
  } catch(error) {
      console.error("falló", error)
  };



function validarMoneda(monedaUsuario){
    monedaUsuario = monedaUsuario.toUpperCase()
    const pares = document.querySelector('#pares').textContent
    if(monedaUsuario.length != 3){
        return 'La moneda de cambio debe tener 3 caracteres'
    }
    if(!/^[a-z]+$/i.test(monedaUsuario)){
        return 'El campo de la moneda de cambio sólo admite letras'
    }
    if(pares.search(monedaUsuario) == -1){
        return "No hay registro de la moneda de cambio elegida"
    }
    else{
        return ''
    }
}

function validarFecha(fecha){
    var año = Number(fecha.substring(0,4))
    var mes = Number(fecha.substring(5,7))
    var dia = Number(fecha.substring(8,10))

    const fechaHoy = document.querySelector('#fechaHoy').textContent

    var añoHoy = Number(fechaHoy.substring(0,4))
    var mesHoy = Number(fechaHoy.substring(5,7))
    var diaHoy = Number(fechaHoy.substring(8,10))
    
    if(año < 1999 && mes < 1 && dia < 4){
        "La fecha debe ser posterior al 4 de Enero de 1999" //hasta ahí son los registros de la api      
    }
    if(año > añoHoy){
        return "La fecha no puede ser futura al día de hoy"
    }
    if(año === añoHoy && mes > mesHoy){
        return "La fecha no puede ser futura al día de hoy"
    }
    if(año === añoHoy && mes === mesHoy && dia > diaHoy){
        return "La fecha no puede ser futura al día de hoy"
    }
    return ''
}

function borrarErrores(){
    $('#errores').text('')
}

function manejarErrores(errores){
    const keys = Object.keys(errores)
    const $errores = $('#errores')[0]
    borrarErrores()
    
    let cantErrores = 0

    keys.forEach(function(key){
        const error = errores[key]

        if(error){
            cantErrores++
            $form[key].className = "error"

            const $error = document.createElement('li')
            $error.innerText = error
            $errores.appendChild($error)
        }else{
            $form[key].className = ""
        }
    })
    return cantErrores
}




function validarFormulario(event){
    const $form = document.querySelector('#consultaDeCambio')
    const moneda = $form.monedaUsuario.value
    const fecha = $form.fechaUsuario.value

    const errorMoneda = validarMoneda(moneda)
    const errorFecha = validarFecha(fecha)

    const errores = {monedaUsuario: errorMoneda, fechaUsuario: errorFecha}

    let esExito = manejarErrores(errores) === 0
    
    if(!esExito){
        console.log(errores)
    }

}


document.querySelector("#boton").onclick = () => {
    const $form = $('#consultaDeCambio')[0]
    const moneda = $form.monedaUsuario.value
    const fecha = $form.fechaUsuario.value
    validarFormulario()
    try{
        fetch(`https://api.frankfurter.app/${fecha}?from=${moneda}`)
            .then(respuesta => respuesta.json())
            .then(respuestaJSON =>{
                $('ul').html('')
          
                Object.keys(respuestaJSON.rates).forEach(moneda => {
                    $('ul').append($(`<li> ${moneda}: ${respuestaJSON.rates[moneda]}</li>`))
                })
        })
    } catch(error) {
        console.error("falló", error)
    }
}

//// tengo que hacer que haga algo el ultimo fetch

// console.log(fecha)

