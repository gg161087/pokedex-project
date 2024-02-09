import { useState } from 'react';
import { useApiData } from './useApiData';
import { usePokemonSearch } from './usePokemonSearch';

export const usePokemons = (initialPage, initialSearch) => {
    const [page, setPage] = useState(initialPage || 0);
    const [search, setSearch] = useState(initialSearch);

    const { loading: apiLoading, pokemons: apiPokemons, total: apiTotal } = useApiData(page);
    const { loading: searchLoading, pokemons: searchPokemons, searchPokemon } = usePokemonSearch(() => {});

    const fetchPokemons = () => {
        // Implementa la lógica para obtener datos aquí, si es necesario
    };

    return {
        loading: apiLoading || searchLoading,
        pokemons: search.length > 1 ? searchPokemons : apiPokemons,
        total: search.length > 1 ? 1 : apiTotal,
        search,
        setPage,
        setSearch,
        searchPokemon,
    };
};