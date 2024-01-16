import './Detail.css';

export const Detail = ({ show, pokemon, close }) => {       
    
    return (
        <div className="modal-container" onClick={close} style={{ display: show ? 'grid' : 'none' }}>
            <section className="modal-body">
            <div className="modal">
                    <img
                        className="img_poke"
                        src={pokemon?.sprites?.other["official-artwork"]?.front_default}
                        alt="pokemon"
                    />
                    <div className={`bg- sub_modal`}>
                        <strong className="id_modal">#{pokemon.id}</strong>
                        <strong className="name_modal">{pokemon.name}</strong>
                        <h4 className="height_poke}">Altura: {pokemon.height}0 cm </h4>
                        <h4 className="weight_poke}">Peso: {pokemon.weight} Kg </h4>                        
                        <div className="div_stats">
                            {pokemon?.stats?.map((sta, index) => {
                                return (
                                    <h6 key={index} className="item_stats">
                                        <span className="name">{sta.stat.name}</span>
                                        <progress value={sta.base_stat} max={110}></progress>
                                        <span className="number}">{sta.base_stat}</span>
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