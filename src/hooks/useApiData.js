import { useState, useEffect } from 'react';
import { getPokemons, getPokemonsWithDetails } from './../services/api.js';

export const useApiData = (page) => {
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPokemons(10, 10 * page);
                const pokesWithData = await getPokemonsWithDetails(response.results);
                setPokemons(pokesWithData);
                setTotal(Math.ceil(response.count / 10));
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        setLoading(true);
        fetchData();
    }, [page]);

    return {
        loading,
        pokemons,
        total,
    };
};