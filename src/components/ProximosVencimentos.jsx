import { obterStatusVencimento } from "../utils/vencimento";

function ProximosVencimentos({ tarefas }) {

    return (

        <div className="painel-grafico">

            <h2>Próximos vencimentos</h2>

            {tarefas.length === 0 ? (

                <p className="mensagem-vazia">
                    Nenhuma tarefa pendente com vencimento.
                </p>

            ) : (

                <ul className="lista-vencimentos">

                    {tarefas.map(tarefa => (

                        <li
                            key={tarefa.id}
                            className="item-vencimento"
                        >

                            <div>

                                <strong>{tarefa.nome}</strong>

                                <small className="data-vencimento">
                                    {tarefa.vencimento
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                </small>

                            </div>

                            <span className={
                                "status-vencimento " +
                                obterStatusVencimento(tarefa)
                                    .toLowerCase()
                                    .replaceAll(" ", "-")
                            }>
                                {obterStatusVencimento(tarefa)}
                            </span>

                        </li>

                    ))}

                </ul>

            )}

        </div>

    );

}

export default ProximosVencimentos;