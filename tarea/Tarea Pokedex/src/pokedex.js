import {cargarPokemon, cargarPokemones} from './servicios/pokemon.js'
import {actualizarTextoIndicePokemones, mostrarListadoPokemones} from './ui/listado.js'
import {actualizarTextoAyuda, mostrarTotalPokemones} from './ui/general.js'
import mostrarPaginador from './ui/paginador.js'
import mostrarPokemon from './ui/pokemon.js'
import obtenerParametrosDeURL from './utilidades/utilidades.js'

async function cambiarPagina(pagina){
    const cant_pokemones_por_pag = 20
    let paginaActual;
    let offset;
    let limit = cant_pokemones_por_pag

    if(typeof pagina === 'number'){
        offset = cant_pokemones_por_pag * (pagina -1)
        paginaActual = pagina
    }else{
        const parametros = obtenerParametrosDeURL(pagina)
        offset = parametros.offset
        limit = parametros.limit
        paginaActual = Math.ceil(parametros.offset / parametros.limit) +1
    }

    actualizarTextoIndicePokemones('Cargando...')

    const respuesta = await cargarPokemones(offset, limit)

    const {
        count: totalPokemones,
        results: pokemones,
        next: urlSiguiente,
        previous: urlAnterior
    } = respuesta

    mostrarTotalPokemones(totalPokemones)
    mostrarListadoPokemones(pokemones, async (nombre) => {
        actualizarTextoAyuda('Cargando...')
        mostrarPokemon(await cargarPokemon(nombre))
    })

    mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, cambiarPagina)
}

export default function inicializar() {
    return cambiarPagina(1)
      .catch((e) => console.error(e));
  }