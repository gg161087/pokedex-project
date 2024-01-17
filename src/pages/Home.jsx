import { useState, useContext, useEffect } from 'react';

import { Header } from './../partials/Header.jsx';
import { Paginator } from './../components/Paginator.jsx';
import { GridCards }from '../components/GridCards.jsx';
import { Footer } from './../partials/Footer.jsx';

import { DataContext } from './../contexts/DataContexts.jsx';

export const Home = () => {

    const { allPokemons, getDataDetails } = useContext(DataContext);

    const [search, setSearch] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [filterPokemons, setFilterPokemons] = useState([])   

    const itemsPerPage = 20;
    
    const indexOfLastPokemon = currentPage * itemsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage; 
    const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon);
    
    const setFilterSearch  = async () => {        
        if (search.length > 0) {
            const pokeSearch = allPokemons?.filter(pokemon => pokemon?.name?.includes(search));
            const pokeSearchWithDetails = await getDataDetails(pokeSearch)
            setFilterPokemons(pokeSearchWithDetails);   
        } else {            
            const pokeSearchWithDetails = await getDataDetails(currentPokemons)         
            setFilterPokemons(pokeSearchWithDetails);           
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
    }, [search, currentPage, filterPokemons])

    console.log(!filterPokemons && filterPokemons.length < 20);
    if (!filterPokemons && filterPokemons.length < 20) {
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