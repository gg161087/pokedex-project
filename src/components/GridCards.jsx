import { Card } from './Card.jsx';

import './GridCards.css';

export const GridCards = ({ pokemons }) => { 
    return (
        <div className='cards_content container'>
            {pokemons.map((pokemon, index) =>(
                <Card key={index} pokemon={pokemon}/>                           
            ))}
        </div>
    )
};