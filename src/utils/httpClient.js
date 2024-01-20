import axios from 'axios';

import { URL_POKEMONS, URL_EVOLUTIONS, URL_SPECIES, URL_TYPES } from './../config.js';

const getDynamic = async (URL) => {
    try {
        const { data } = await axios.get(URL);        
        return data.results;
    } catch (error) {
        console.error(error);
    }
};
const getPokemonImage = async (id) => {
    const response = await axios.get(`${URL_POKEMONS}/${id}`);
    return response?.data?.sprites?.other["official-artwork"]?.front_default;
}

const getAllPokemonDetails = async (pokemonURLs) => {
    const detailedPokemon = await Promise.all(
        pokemonURLs.map(async (pokemon) => {
            const arrayEvoluciones = [];
            try {
                const { data } = await axios.get(pokemon.url);                                
                const specieUrl = data.species.url.split("/"); 
                const resSpecies = await axios.get(`${URL_SPECIES}/${specieUrl[6]}`);                           
                const URL = resSpecies.data.evolution_chain.url.split("/");                              
                const api = await axios.get(`${URL_EVOLUTIONS}/${URL[6]}`);                
                const URL2 = api?.data?.chain?.species?.url?.split("/");                
                const img1 = await getPokemonImage(URL2[6]);
                arrayEvoluciones.push({
                    img: img1,
                    name: api?.data?.chain?.species?.name,
                });

                if (api?.data?.chain?.evolves_to?.length !== 0) {
                    const DATA2 = api?.data?.chain?.evolves_to[0]?.species;
                    const ID = DATA2?.url?.split("/");
                    const img2 = await getPokemonImage(ID[6]);

                    arrayEvoluciones.push({
                        img: img2,
                        name: DATA2?.name,
                    });

                    if (api?.data?.chain.evolves_to[0].evolves_to.length !== 0) {
                        const DATA3 =
                            api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species;
                        const ID = DATA3?.url?.split("/");
                        const img3 = await getPokemonImage(ID[6]);

                        arrayEvoluciones.push({
                            img: img3,
                            name: DATA3?.name,
                        });
                    }
                }
                data.evolutions = arrayEvoluciones;             
                return data;
            } catch (error) {
                console.error(`Error obteniendo detalles de ${pokemon.name}:`, error);
                return null;
            }
        })
    );
    return detailedPokemon.filter((pokemon) => pokemon !== null);
};
export const getPokemons = async () => {
    const pokemons = await getDynamic(`${URL_POKEMONS}/?limit=1302`);
    return pokemons
}

export const getPokemonsWithDetails = async (pokemons) => {    
    const pokemonDetails = await getAllPokemonDetails(pokemons);    
    return pokemonDetails;
};