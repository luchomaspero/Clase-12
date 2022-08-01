export const URL_API = 'https://pokeapi.co/api/v2/pokemon/'
export const limite_pokemones = 20

export async function cargarPokemon(id){
    if(id === undefined){
        throw new Error('Se necesita un identificador para cargar un pokemon')
    }
    return(await fetch(`${URL_API}${id}`)).json()
}

export async function cargarPokemones(offset=0, limite=limite_pokemones){
    return(await fetch(`${URL_API}?offset=${offset}&limit=${limite}`)).json()
}