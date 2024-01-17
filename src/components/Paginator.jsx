import { useContext } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { DataContext } from './../contexts/DataContexts.jsx';

import './Paginator.css';

export const Paginator = ({ totalItems, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / 20);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="container">
            <div className="paginator">
                <nav>
                    <ul className="pagination">
                        <li>
                            <FaArrowLeft onClick={handlePrevPage} disabled={currentPage === 1}/>
                        </li>
                        <li>
                            <span>Página {currentPage} de {totalPages}</span>
                        </li>
                        <li>
                            <FaArrowRight onClick={handleNextPage} disabled={currentPage === totalPages}/>                            
                        </li>
                    </ul>
                </nav>               
            </div>
        </div>
    )
};