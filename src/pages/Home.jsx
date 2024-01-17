import { useState, useContext, useEffect } from 'react';

import { Header } from './../partials/Header.jsx';
import { Paginator } from './../components/Paginator.jsx';
import { GridCards }from '../components/GridCards.jsx';
import { Footer } from './../partials/Footer.jsx';

import { DataContext } from './../contexts/DataContexts.jsx';

export const Home = () => {
    const [search, setSearch] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1);    
    const { pokemons, filterPokemons, setFilterPokemons } = useContext(DataContext);
    const currentPokemons = pokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const itemsPerPage = 20;

    const indexOfLastPokemon = currentPage * itemsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage; 

    const setFilterSearch  = () => {
        if (search.length > 0) {
            setFilterPokemons(pokemons?.filter(pokemon => pokemon?.name?.includes(search)));   
        } else {
            setFilterPokemons(pokemons);
        }     
    }

    const getSearch = (e) => {
        const texto = e.toLowerCase();
        setSearch(texto);
        setCurrentPage(1);        
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    useEffect(() => {
        setFilterSearch();
    }, [filterPokemons])

    if (!filterPokemons) {
        return (
            <div>
                loading
            </div>
        )
    }
   
    return (
        <>
            <Header getSearch={getSearch}/>
            <Paginator                
                totalItems={filterPokemons?.length || 0}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            ></Paginator>            
            <GridCards pokemons={filterPokemons}/>
            <Footer/>
        </>
    )
};