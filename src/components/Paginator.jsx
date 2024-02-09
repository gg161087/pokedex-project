import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import './Paginator.css';

export const Paginator = ({ setPage, page, total }) => {

    console.log(page);

    const handlePrev = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNext = () => {
        setPage((prevPage) => Math.min(prevPage + 1, total - 1));
    };

    return (
        <div className="container">
            <div className="paginator">
                <nav>
                    <ul className="pagination">
                        <li>
                            <FaArrowLeft onClick={handlePrev} className={ page === 0 ? "disabled" : "arrow"}/>
                        </li>
                        <li>
                            <span className="total">Page {isNaN(parseInt(page)) ? 1 : parseInt(page) + 1} of {total}</span>
                        </li>
                        <li>
                            <FaArrowRight onClick={handleNext} className={page+1 === total? "disabled" : "arrow"}/>                            
                        </li>
                    </ul>
                </nav>               
            </div>
        </div>
    )
};