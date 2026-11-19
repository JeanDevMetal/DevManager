function CardEstatistica({ titulo, valor, classe = "" }) {

    return (

        <div className={`card-estatistica ${classe}`}>

            <h3>{titulo}</h3>

            <p>{valor}</p>

        </div>

    );

}

export default CardEstatistica;