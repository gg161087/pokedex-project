import { useContext } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { DataContext } from './../contexts/DataContexts.jsx';

import './Paginator.css';

export const Paginator = ({ totalItems, currentPage, onPageChange }) => {

    const { itemsPerPage } = useContext(DataContext);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

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
                            <FaArrowLeft onClick={handlePrevPage} className={ currentPage === 1 ? "disabled" : "arrow"}/>
                        </li>
                        <li>
                            <span className="total">Page {currentPage} of {totalPages}</span>
                        </li>
                        <li>
                            <FaArrowRight onClick={handleNextPage} className={currentPage === totalPages? "disabled" : "arrow"}/>                            
                        </li>
                    </ul>
                </nav>               
            </div>
        </div>
    )
};