import { useState, useContext, useEffect } from 'react';

import { Header } from './../partials/Header.jsx';
import { Paginator } from './../components/Paginator.jsx';
import { GridCards }from '../components/GridCards.jsx';
import { Footer } from './../partials/Footer.jsx';

import { DataContext } from './../contexts/DataContexts.jsx';

export const Home = () => {

    const { allPokemons, filterPokemons, currentPage, setCurrentPage, setSearch} = useContext(DataContext);

    const getSearch = (e) => {
        const texto = e.toLowerCase();
        setSearch(texto);
        setCurrentPage(1);        
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                totalItems={allPokemons?.length || 0}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            ></Paginator>            
            <GridCards pokemons={filterPokemons}/>
            <Footer/>
        </>
    )
};