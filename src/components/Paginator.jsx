import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import './Paginator.css';

export const Paginator = ({ setPage, page, total }) => {

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