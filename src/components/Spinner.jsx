import './Spinner.css';

export const Spinner = () => {
    return (
        <div className="container">
            <div className="loading">
                <div className="spinner"></div>
                <h3 className="title__loading">Cargando...</h3>
            </div>
        </div>
    )
}