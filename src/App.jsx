import { useState, useEffect } from 'react';

import { Spinner } from './components/Spinner.jsx';
import { Header } from './partials/Header.jsx';
import { Paginator } from './components/Paginator.jsx';
import { GridCards } from './components/GridCards.jsx';
import { Footer } from './partials/Footer.jsx';

import { getPokemons, getPokemonsData, getDynamic, getPokemonsComplete } from './services/api.js'

export const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const handlerSearch = async (poke) => {
        try {
            const response = await getDynamic(`pokemon/${poke}`)
            if (response.name) {
                console.log(response);
                setPokemons([response])
                setLoading(false)
            } else {
                alert('pokemon no encontrado')
                fetchPokemons();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPokemons = async () => {
        try {
            const response = await getPokemons(10, 10*page);
            const pokesWithData = await getPokemonsComplete(response.results);
            setPokemons(pokesWithData)
            setTotal(Math.ceil(response.count / 10))
            setLoading(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        setLoading(true)
        fetchPokemons()
    }, [page])

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