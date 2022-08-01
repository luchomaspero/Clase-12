function crearItemPaginador(texto, url='#'){
    const $item = document.createElement('li')
    const $link = document.createElement('a')
    $item.className = 'page-item'
    $link.className = 'page-link'
    $link.textContent = texto
    $link.href = url
    $link.dataset.pagina = texto

    $item.appendChild($link)

    return $item
}

export function manejarCambioPagina(e, callbackPaginaSeleccionada = () => {}){
    e.preventDefault()
    const {target} = e
    const href = target.getAttribute('href')
    let numeroPagina
    const {pagina} = target.dataset
    if(href === '#'){
        numeroPagina = Number(pagina)
        callbackPaginaSeleccionada(numeroPagina)
    }else{
        callbackPaginaSeleccionada(href)
    }
}

export default function mostrarPaginador(totalPokemones, paginaActual,urlSiguiente,urlAnterior,callbackPaginaSeleccionada =() =>{}){
    const cant_pokemones_por_pag = 20
    const $paginador = document.querySelector('#paginador')
    $paginador.innerHTML = ''

    const totalPaginas = Math.ceil(totalPokemones/cant_pokemones_por_pag)

    const $paginaAnterior = crearItemPaginador('Anterior', urlAnterior)

    if(urlAnterior){ //aca activo o desactivo la opcion de pagina anterior (por si estoy en la primera)
        $paginaAnterior.classList.remove('disabled')
    }else{
        $paginaAnterior.classList.add('disabled')
    }

    $paginador.appendChild($paginaAnterior) //muestro "Anterior"
    

    //ahora voy a dar la info de cada pagina:
    for(let i=0; i < totalPaginas; i++){
        const numeroPagina = i +1
        const $pagina = crearItemPaginador(numeroPagina)
        if(numeroPagina === paginaActual){
            $pagina.classList.add('active')
        }
        $paginador.appendChild($pagina)
    }

    const $paginaSiguiente = crearItemPaginador('Siguiente', urlSiguiente)
    if(urlSiguiente){
        $paginaSiguiente.classList.remove('disabled')
    }else{
        $paginaSiguiente.classList.add('disabled')
    }
    $paginador.appendChild($paginaSiguiente) //muestro "Siguiente"

    $paginador.onclick = (e) => {
    manejarCambioPagina(e, callbackPaginaSeleccionada);
  };
}