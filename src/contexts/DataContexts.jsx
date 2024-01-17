import { createContext, useState, useEffect } from 'react';
import { getPokemonsWithDetails, getPokemons } from '../utils/httpClient.js';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [allPokemons, setAllPokemons] = useState([]);
    
    const getDataDetails = async (pokes) => {
        const pokesWithDetails = await getPokemonsWithDetails(pokes);
        if (pokesWithDetails) {           
            return pokesWithDetails                       
        }
    }

    const getData = async () => {
        const resPokemons = await getPokemons();
        setAllPokemons(resPokemons)        
    }

    useEffect(() =>{
        getData();            
    },[])

    if (!allPokemons) {
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
                getDataDetails                                               
            }
        }>
            {children}
        </DataContext.Provider>
    );
};