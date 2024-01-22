import axios from 'axios';

const URL_BASE = 'https://pokeapi.co/api/v2/';

export const getDynamic = async (path = '') => {
    try {
        const { data } = await axios.get(URL_BASE + path);        
        return data;
    } catch (error) {
        console.error(error);
    }
};

const getWithUrl = async (url) => {
    const { data } = await axios.get(url)
    return data;
};

const getEvolutionImg = async (name) => {
    const pokemon = await getDynamic(`pokemon/${name}`);
    return {
        img: pokemon.sprites?.other["official-artwork"]?.front_default,
        name: name
    }
};

export const getPokemonsData = async (pokemons) => {    
    try {       
        const results = await Promise.all(pokemons.map(async(pokemon) => {            
            const arrayEvoluciones = [];           
            const pokemonData = await getDynamic(`pokemon/${pokemon.name}`)            
            const pokemonSpecie = await getWithUrl(pokemonData.species.url)            
            const pokemonEvolution = await getWithUrl(pokemonSpecie.evolution_chain.url) 
            if (pokemonEvolution.chain?.species.name) {
                const name = await getEvolutionImg(pokemonEvolution.chain?.species.name)                
                arrayEvoluciones.push(name)
            }
            if (pokemonEvolution.chain?.evolves_to[0]) {
                const name = await getEvolutionImg(pokemonEvolution.chain?.evolves_to[0]?.species.name); 
                arrayEvoluciones.push(name)              
            }                 
            if (pokemonEvolution.chain?.evolves_to[0]?.evolves_to[0]) {
                const name = await getEvolutionImg(pokemonEvolution.chain?.evolves_to[0]?.evolves_to[0]?.species.name);
                arrayEvoluciones.push(name)
            }
            pokemonData.evolutions = arrayEvoluciones;
            return pokemonData
        }))        
        return results
    } catch (error) {
        console.error(error)
    }
};

export const getPokemons = async (limit = 10, offset=0) => {
    const pokemons = await getDynamic(`pokemon/?limit=${limit}&offset=${offset}`);
    return pokemons
};