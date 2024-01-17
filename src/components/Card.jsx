import { useState } from 'react';

import { Detail } from './Detail.jsx';

import './Card.css';

export const Card = ({ pokemon }) => {  

    const [show, setShow] = useState(false); 

    const openDetail = () => {
        setShow(true)
    };
    const closeDetail = () => {
        setShow(false)
    }

    const getTypeStyle = (type) => {
        const bg = {
            normal: '#A1ADAF',
            fighting: '#FFA561',
            flying: '#7ADEDB',
            poison: '#5F5C5E',
            ground: '#BE8A6E',
            rock: 'blue',
            bug: '#B6E898',
            ghost: 'blue',
            steel: 'blue',
            fire: '#FB8B6C',
            water: '#7DDCF3',
            grass: 'blue',
            electric: '#F2DE7C',
            psychic: '#EA9DDA',
            ice: 'blue',
            dragon: 'blue',
            dark: 'blue',            
            fairy: '#7E9497',
            unknown: '#E85570',
            shadow: 'blue'
        };
        const color = {
            Neutral: '#3C4F61',
            Fire: '#672016',
            Water: '#0E7198',
            Nature: '#3F5D20',
            Electric: '#8C5C00',
            Earth: '#58321D',
            Mental: '#691E67',
            Wind: '#056B5B',
            Digital: '#203537',
            Melee: '#203537',
            Crystal: '#5E0A18',
            Toxic: '#1B191D'
        };

        let cardStyle = { backgroundColor: '', color: ''};
        cardStyle.backgroundColor = bg[type];
        cardStyle.color = 'white'
        
        return cardStyle;
    };    
    
    return (
        <>
            <Detail show={show} pokemon={pokemon} close={closeDetail}></Detail> 
            <div className='card' onClick={openDetail}>
                <div className='card__body'>
                    <div className='card__body-img'>
                        <img src={pokemon.sprites?.other["official-artwork"]?.front_default} alt={pokemon.name}/>
                        <span className='card__body-id'>{pokemon.id}</span>
                    </div>
                    <div className='card__body-types'>
                        {pokemon.types?.map((type, index) => (                                                        
                            <div key={index} className={`type color-${type['type'].name}`}>                                                                                
                                <span>{type['type'].name}</span>
                            </div>
                        ))}
                    </div>
                    <div className='card__body-name'>
                        <span>{pokemon.name}</span>
                    </div>
                </div>                    
            </div>
        </>
    )
}