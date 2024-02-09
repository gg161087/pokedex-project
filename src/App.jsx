import { useState, useEffect } from 'react';

import { Spinner } from './components/Spinner.jsx';
import { Header } from './partials/Header.jsx';
import { Paginator } from './components/Paginator.jsx';
import { GridCards } from './components/GridCards.jsx';
import { Footer } from './partials/Footer.jsx';

import { usePokemons } from './hooks/usePokemons.js';

export const App = () => {
    const { loading, pokemons, total, search, setSearch, page, setPage, searchPokemon } = usePokemons(0, '');

    return (
        <>
            <Header handlerSearch={searchPokemon} search={search} setSearch={setSearch} />
                    <Paginator 
                        setPage={setPage}                        
                        page={page}
                        total={total}
                    ></Paginator>
            {loading ? <Spinner /> : 
                <>
                    <GridCards pokemons={pokemons} />
                </>
            }
            <Footer/>
        </>
    )
}