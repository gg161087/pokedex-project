import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import './Paginator.css';

export const Paginator = ({ handlePrevPage, handleNextPage, page, total }) => {

    return (
        <div className="container">
            <div className="paginator">
                <nav>
                    <ul className="pagination">
                        <li>
                            <FaArrowLeft onClick={handlePrevPage} className={ page === 1 ? "disabled" : "arrow"}/>
                        </li>
                        <li>
                            <span className="total">Page {page} of {total}</span>
                        </li>
                        <li>
                            <FaArrowRight onClick={handleNextPage} className={page === total? "disabled" : "arrow"}/>                            
                        </li>
                    </ul>
                </nav>               
            </div>
        </div>
    )
};