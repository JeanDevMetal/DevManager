function PainelProgresso({ concluidas, total, progresso }) {

    return (

        <div className="painel-progresso">

            <h2>Progresso geral</h2>

            <div className="barra-progresso">

                <div
                    className="progresso-preenchimento"
                    style={{ width: `${progresso}%` }}
                />

            </div>

            <p>
                {concluidas} de {total} tarefas concluídas
                ({progresso}%)
            </p>

        </div>

    );

}

export default PainelProgresso;