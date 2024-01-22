import { useState, useEffect } from 'react';

import { Spinner } from './components/Spinner.jsx';
import { Header } from './partials/Header.jsx';
import { Paginator } from './components/Paginator.jsx';
import { GridCards } from './components/GridCards.jsx';
import { Footer } from './partials/Footer.jsx';

import { getPokemons, getPokemonsData, getDynamic } from './services/api.js'

export const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const handlerSearch = async (poke) => {
        try {
            const response = await getDynamic(`pokemon/${poke}`)
            if (response) {
                setPokemons([response])
                setLoading(!loading)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const prevPage = Math.max(page -1, 0)  
            setPage(prevPage)             
        }
    };

    const handleNextPage = () => {
        if (page < total) {
            const nextPage = Math.min(page +1, total)
            setPage(nextPage)            
        }
    };

    const fetchPokemons = async () => {
        try {
            const response = await getPokemons(10, 10*page);
            const pokesWithData = await getPokemonsData(response.results);
            setPokemons(pokesWithData)
            setTotal(Math.ceil(response.count / 10))
            setLoading(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchPokemons()
    }, [page])

    return (
        <>
            <Header handlerSearch={handlerSearch} search={search} setSearch={setSearch} />
            {loading ? <Spinner /> : 
                <>
                    <Paginator 
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                        page={page}
                        total={total}
                    ></Paginator>
                    <GridCards pokemons={pokemons} />
                </>
            }
            <Footer />
        </>


    )
}