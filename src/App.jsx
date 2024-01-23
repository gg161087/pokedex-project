import { useState, useEffect } from 'react';

import { Spinner } from './components/Spinner.jsx';
import { Header } from './partials/Header.jsx';
import { Paginator } from './components/Paginator.jsx';
import { GridCards } from './components/GridCards.jsx';
import { Footer } from './partials/Footer.jsx';

import { getPokemons, getDynamic, getPokemonsWithDetails } from './services/api.js';

export const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const handlerSearch = async (poke) => {
        try {
            if (search.length > 1) {
                setLoading(true)
                const response = await getDynamic(`pokemon/${poke}`)                
                if (response) {                    
                    setPokemons([response])
                    setLoading(false)               
                } else {
                    alert('pokemon no encontrado')  
                }
            } else {                                
                fetchPokemons();
            }                            
            
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPokemons = async () => {
        try {
            const response = await getPokemons(10, 10*page);
            const pokesWithData = await getPokemonsWithDetails(response.results);
            setPokemons(pokesWithData)
            setTotal(Math.ceil(response.count / 10))
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchPokemons()        
    }, [page, search])

    return (
        <>
            <Header handlerSearch={handlerSearch} search={search} setSearch={setSearch} />
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