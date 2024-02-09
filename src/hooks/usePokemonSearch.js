import { useState } from 'react';
import { getDynamic } from './../services/api.js';

export const usePokemonSearch = (fetchPokemons) => {
    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState([]);

    const searchPokemon = async (poke) => {
        try {
            if (poke.length > 1) {
                setLoading(true);
                const response = await getDynamic(`pokemon/${poke}`);
                if (response) {
                    setPokemons([response]);
                    setLoading(false);
                } else {
                    alert('Pokemon no encontrado');
                }
            } else {
                fetchPokemons();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        loading,
        pokemons,
        searchPokemon,
    };
};