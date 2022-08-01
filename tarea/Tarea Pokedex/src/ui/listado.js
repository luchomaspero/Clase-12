export function actualizarTextoIndicePokemones(texto){
    document.querySelector('#indice').textContent = texto
}

export function mostrarListadoPokemones(pokemones, pokemonSeleccionadoCallBack = () => {}){
    const $indice = document.querySelector('#indice')
    $indice.innerHTML = ''

    pokemones.forEach(pokemon => {
        const nombre = pokemon.name
        const $link = document.createElement('a')
        $link.className = 'list-group-item list-group-item-action'
        $link.setAttribute('href', '#')
        $link.textContent = nombre
        $link.onclick = () => pokemonSeleccionadoCallBack(nombre)
        $indice.appendChild($link)
    });
}