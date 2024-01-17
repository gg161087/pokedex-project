import './Detail.css';

export const Detail = ({ show, pokemon, close }) => {       
    
    return (
        <div className="modal-container" onClick={close} style={{ display: show ? 'grid' : 'none' }}>
            <section className="modal">
                <div className="modal-body">
                    <img
                        className="img_poke"
                        src={pokemon?.sprites?.other["official-artwork"]?.front_default}
                        alt="pokemon"
                    />
                    <div className="characteristics">
                        <strong className="id">#{pokemon.id}</strong>
                        <h2 className="name">{pokemon.name}</h2>
                        <span className="height">Altura: {pokemon.height}0 cm </span>
                        <span className="weight">Peso: {pokemon.weight} Kg </span>                        
                        <div className="stats">
                            {pokemon?.stats?.map((sta, index) => {
                                return (
                                    <h6 key={index} className="stat">
                                        <span className="stat__name">{sta.stat.name}</span>
                                        <progress className="stat__progress" value={sta.base_stat} max={110}></progress>
                                        <span className="stat__number">{sta.base_stat}</span>
                                    </h6>
                                );
                            })}
                        </div>

                        <div className="div_type_color">
                            {pokemon?.types?.map((ti, index) => {
                                return (
                                    <h6 key={index} className={`color-${ti.type.name} color_type`}>                              
                                        {ti.type.name}
                                    </h6>
                                );
                            })}
                        </div>
                        <div className="div_evolucion">
                            {pokemon.evolutions?.map((evo, index) => {
                                return (
                                    <div key={index} className="item_evo">
                                        <img src={evo.img} alt="evo" className="img"/>
                                        <h6> {evo.name} </h6>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}