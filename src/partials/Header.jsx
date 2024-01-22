import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';

import logo from './../assets/pokedex_logo.svg';
import './Header.css';

export const Header = ({ handlerSearch, search, setSearch }) => {
    
    const handlerInput = (e) => {
        setSearch(e.target.value)        
    }
    const handlerClick = () => {        
        handlerSearch(search);
    }

    return (
        <nav className='header'>
            <div className='div_header container'>
                <div className='div_logo'>
                    <img src={logo} alt="logo"/>
                </div>
                <div className='div_search'>
                    <div>
                        <FaIcons.FaSearch onClick={handlerClick}/>
                    </div>
                    <input type="search" onChange={handlerInput}/>
                </div>
            </div>
        </nav>
    );
}