import { useState, useContext } from 'react';

import { Header } from './../partials/Header.jsx';
import { GridCards }from '../components/GridCards.jsx';
import { Footer } from './../partials/Footer.jsx';

import { DataContext } from './../contexts/DataContexts.jsx';

export const Home = () => {
    const [search, setSearch] = useState('');
    const { pokemons, types } = useContext(DataContext); 

    const filterPokemons = search?.length > 0
        ? pokemons?.filter(pokemon => pokemon?.name?.includes(search))
        : pokemons

    const getSearch = (e) => {
        const texto = e.toLowerCase();
        setSearch(texto)        
    }
       
    return (
        <>
            <Header getSearch={getSearch}/>
            <GridCards pokemons={filterPokemons}/>
            <Footer/>
        </>
    )
}
