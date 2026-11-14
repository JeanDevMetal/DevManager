
import { useState, useEffect } from "react";

function FormularioTarefa() {

    // ESTADOS
    const [nomeTarefa, setNomeTarefa] = useState("");
    const [idEmEdicao, setIdEmEdicao] = useState(null);
    const [textoEdicao, setTextoEdicao] = useState("");
    const [filtro, setFiltro] = useState("todas");
    const [busca, setBusca] = useState("");

    // RECUPERAR TAREFAS DO LOCALSTORAGE
    const [tarefas, setTarefas] = useState(() => {
        try {
            const tarefasSalvas = localStorage.getItem("tarefas");

            if (tarefasSalvas) {
                const dados = JSON.parse(tarefasSalvas);
                return Array.isArray(dados) ? dados : [];
            }

            return [];

        } catch (erro) {
            console.error("Erro ao recuperar tarefas:", erro);
            return [];
        }
    });

    // SALVAR TAREFAS AUTOMATICAMENTE
    useEffect(() => {
        localStorage.setItem(
            "tarefas",
            JSON.stringify(tarefas)
        );
    }, [tarefas]);

    // ESTATÍSTICAS
    const totalTarefas = tarefas.length;

    const tarefasConcluidas = tarefas.filter(
        tarefa => tarefa.concluida === true
    ).length;

    const tarefasPendentes = tarefas.filter(
        tarefa => tarefa.concluida === false
    ).length;

    // FILTRAR TAREFAS POR STATUS E PESQUISA
    const tarefasFiltradas = tarefas.filter(tarefa => {

        const correspondeBusca = tarefa.nome
            .toLowerCase()
            .includes(busca.toLowerCase().trim());

        const correspondeFiltro =
            filtro === "todas" ||
            (filtro === "concluidas" && tarefa.concluida) ||
            (filtro === "pendentes" && !tarefa.concluida);

        return correspondeBusca && correspondeFiltro;
    });

    // CADASTRAR TAREFA
    function cadastrarTarefa() {

        if (nomeTarefa.trim() === "") {
            alert("Digite o nome da tarefa!");
            return;
        }

        const novaTarefa = {
            id: crypto.randomUUID(),
            nome: nomeTarefa.trim(),
            concluida: false
        };

        setTarefas(anterior => [
            ...anterior,
            novaTarefa
        ]);

        setNomeTarefa("");
    }

    // EXCLUIR TAREFA
    function excluirTarefa(idExcluir) {

        setTarefas(anterior =>
            anterior.filter(
                tarefa => tarefa.id !== idExcluir
            )
        );
    }

    // ATUALIZAR NOME DA TAREFA
    function editarTarefa(idTarefa, novoNome) {

        if (novoNome.trim() === "") {
            alert("O nome da tarefa não pode ficar vazio!");
            return;
        }

        setTarefas(anterior =>
            anterior.map(tarefa =>
                tarefa.id === idTarefa
                    ? {
                        ...tarefa,
                        nome: novoNome.trim()
                    }
                    : tarefa
            )
        );
    }

    // INICIAR EDIÇÃO
    function iniciarEdicao(tarefa) {
        setIdEmEdicao(tarefa.id);
        setTextoEdicao(tarefa.nome);
    }

    // SALVAR EDIÇÃO
    function salvarEdicao() {

        if (textoEdicao.trim() === "") {
            alert("O nome da tarefa não pode ficar vazio!");
            return;
        }

        editarTarefa(idEmEdicao, textoEdicao);

        setIdEmEdicao(null);
        setTextoEdicao("");
    }

    // CANCELAR EDIÇÃO
    function cancelarEdicao() {
        setIdEmEdicao(null);
        setTextoEdicao("");
    }

    // CONCLUIR OU DESMARCAR TAREFA
    function alternarConclusao(idTarefa) {

        setTarefas(anterior =>
            anterior.map(tarefa =>
                tarefa.id === idTarefa
                    ? {
                        ...tarefa,
                        concluida: !tarefa.concluida
                    }
                    : tarefa
            )
        );
    }

    return (
        <div>
            <div className="formulario-tarefa">

                <h2>Estatísticas</h2>

                <div className="grid-estatisticas">

                    <div className="card-estatistica">
                        <h3>Total</h3>
                        <p>{totalTarefas}</p>
                    </div>

                    <div className="card-estatistica">
                        <h3>Concluídas</h3>
                        <p>{tarefasConcluidas}</p>
                    </div>

                    <div className="card-estatistica">
                        <h3>Pendentes</h3>
                        <p>{tarefasPendentes}</p>
                    </div>

                </div>

                <h2>Cadastrar nova tarefa</h2>

                <div className="linha-formulario">

                    <input
                        type="text"
                        placeholder="Nome da tarefa"
                        value={nomeTarefa}
                        onChange={(evento) =>
                            setNomeTarefa(evento.target.value)
                        }
                    />

                    <button
                        className="btn-cadastrar"
                        onClick={cadastrarTarefa}
                    >
                        Cadastrar
                    </button>

                </div>

                <h2>Minhas tarefas</h2>

                {/* BOTÕES DE FILTRO */}
                <div className="filtros-tarefas">

                    <button
                        onClick={() => setFiltro("todas")}
                    >
                        Todas
                    </button>

                    <button
                        onClick={() => setFiltro("pendentes")}
                    >
                        Pendentes
                    </button>

                    <button
                        onClick={() => setFiltro("concluidas")}
                    >
                        Concluídas
                    </button>

                </div>

                {/* CAMPO DE PESQUISA */}
                <div className="campo-busca">

                    <input
                        type="text"
                        placeholder="Pesquisar tarefas..."
                        value={busca}
                        onChange={(evento) =>
                            setBusca(evento.target.value)
                        }
                    />

                </div>

                {/* LISTA DE TAREFAS */}
                <ul className="lista-tarefas">

                    {tarefasFiltradas.map((tarefa) => (

                        <li
                            key={tarefa.id}
                            className="item-tarefa"
                        >

                            {/* NOME OU CAMPO DE EDIÇÃO */}
                            {idEmEdicao === tarefa.id ? (

                                <input
                                    type="text"
                                    value={textoEdicao}
                                    onChange={(evento) =>
                                        setTextoEdicao(evento.target.value)
                                    }
                                />

                            ) : (

                                <span
                                    style={{
                                        textDecoration: tarefa.concluida
                                            ? "line-through"
                                            : "none"
                                    }}
                                >
                                    {tarefa.nome}
                                </span>

                            )}

                            {/* BOTÕES DE AÇÃO */}
                            <div className="acoes-tarefa">

                                {idEmEdicao === tarefa.id ? (

                                    <>
                                        <button
                                            className="btn-concluir"
                                            onClick={salvarEdicao}
                                        >
                                            Salvar
                                        </button>

                                        <button
                                            className="btn-desmarcar"
                                            onClick={cancelarEdicao}
                                        >
                                            Cancelar
                                        </button>
                                    </>

                                ) : (

                                    <>
                                        <button
                                            className={
                                                tarefa.concluida
                                                    ? "btn-desmarcar"
                                                    : "btn-concluir"
                                            }
                                            onClick={() =>
                                                alternarConclusao(tarefa.id)
                                            }
                                        >
                                            {tarefa.concluida
                                                ? "Desmarcar"
                                                : "Concluir"}
                                        </button>

                                        <button
                                            className="btn-editar"
                                            onClick={() =>
                                                iniciarEdicao(tarefa)
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn-excluir"
                                            onClick={() =>
                                                excluirTarefa(tarefa.id)
                                            }
                                        >
                                            Excluir
                                        </button>
                                    </>

                                )}

                            </div>

                        </li>

                    ))}

                </ul>

                {/* MENSAGEM QUANDO NÃO HÁ RESULTADOS */}
                {tarefasFiltradas.length === 0 && (
                    <p>Nenhuma tarefa encontrada.</p>
                )}

            </div>
        </div>
    );
}

export default FormularioTarefa;
