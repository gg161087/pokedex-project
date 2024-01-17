import { createContext, useState, useEffect } from 'react';
import { getPokemonsWithDetails, getPokemons } from '../utils/httpClient.js';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);
     
    const [filterPokemons, setFilterPokemons] = useState([])  
    const itemsPerPage = 20;

    const indexOfLastPokemon = currentPage * itemsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;        

    const getData = async () => {
        const resPokemons = await getPokemons();
        if (resPokemons) {           
            setPokemons(resPokemons);                       
        }
    }

    useEffect(() =>{
        getData();            
    },[])

    if (!pokemons) {
        return (
            <div className="container">
                <h2>Loading</h2>
            </div>
        )
    }
    
    return (
        <DataContext.Provider value={
            { 
                pokemons,
                filterPokemons,
                setFilterPokemons
                                                   
            }
        }>
            {children}
        </DataContext.Provider>
    );
};