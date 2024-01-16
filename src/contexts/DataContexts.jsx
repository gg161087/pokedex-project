import { createContext, useState, useEffect } from 'react';
import { getPokemonsWithDetails } from '../utils/httpClient.js';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);    
    

    const getData = async () => {
        const resPokemons = await getPokemonsWithDetails();
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
                pokemons              
            }
        }>
            {children}
        </DataContext.Provider>
    );
};