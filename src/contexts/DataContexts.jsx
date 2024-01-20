import { createContext, useState, useEffect } from 'react';
import { getPokemonsWithDetails, getPokemons } from '../utils/httpClient.js';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [search, setSearch] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1);
    const [filterPokemons, setFilterPokemons] = useState([])  
    
    const itemsPerPage = 15;
    
    const indexOfLastPokemon = currentPage * itemsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage; 
    
    const setFilterSearch  = async () => { 
        const response = await getPokemons(); 
        setAllPokemons(response);   
        const currentPokemons = response?.slice(indexOfFirstPokemon, indexOfLastPokemon); 
        const pokesWithDetails = await getPokemonsWithDetails(currentPokemons);
        setFilterPokemons(pokesWithDetails); 
        const pokeSearch = allPokemons?.filter(pokemon => pokemon?.name?.includes(search));
        if (search.length > 0) {                
            const pokeSearchWithDetails = await getPokemonsWithDetails(pokeSearch)
            setFilterPokemons(pokeSearchWithDetails); 
            console.log(pokeSearchWithDetails);  
        }       
    }

    useEffect(() =>{        
        setFilterSearch();
        console.log(filterPokemons);            
    },[search, currentPage])

    if (!filterPokemons) {
        return (
            <div className="container">
                <h2>Loading</h2>
            </div>
        )
    }
    
    return (
        <DataContext.Provider value={
            { 
                allPokemons,
                filterPokemons,
                currentPage,
                setCurrentPage,
                search,
                setSearch                                                                      
            }
        }>
            {children}
        </DataContext.Provider>
    );
};