
import { obterStatusVencimento } from "../utils/vencimento";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function Dashboard({ tarefas }) {

    // ESTATÍSTICAS
    const totalTarefas = tarefas.length;

    const tarefasConcluidas = tarefas.filter(
        tarefa => tarefa.concluida === true
    ).length;

    const tarefasPendentes = tarefas.filter(
        tarefa => tarefa.concluida === false
    ).length;

    const tarefasAtrasadas = tarefas.filter(
        tarefa => obterStatusVencimento(tarefa) === "Atrasada"
    ).length;

    // CÁLCULO DO PROGRESSO
    const progresso = totalTarefas > 0
        ? Math.round((tarefasConcluidas / totalTarefas) * 100)
        : 0;

    // DADOS DO GRÁFICO DE SITUAÇÃO
    const dadosSituacao = [
        {
            name: "Concluídas",
            value: tarefasConcluidas
        },
        {
            name: "Pendentes",
            value: tarefasPendentes
        }
    ];

    const coresSituacao = ["#22c55e", "#eab308"];

    // DADOS DO GRÁFICO DE PRIORIDADES
    const dadosPrioridade = [
        {
            name: "Baixa",
            value: tarefas.filter(
                tarefa => tarefa.prioridade === "baixa"
            ).length
        },
        {
            name: "Média",
            value: tarefas.filter(
                tarefa => (tarefa.prioridade || "media") === "media"
            ).length
        },
        {
            name: "Alta",
            value: tarefas.filter(
                tarefa => tarefa.prioridade === "alta"
            ).length
        }
    ];

    const coresPrioridade = [
        "#22c55e",
        "#eab308",
        "#ef4444"
    ];

    // DADOS DO GRÁFICO DE VENCIMENTOS
    const dadosVencimento = [
        {
            name: "Atrasadas",
            value: tarefasAtrasadas
        },
        {
            name: "Vence hoje",
            value: tarefas.filter(
                tarefa => obterStatusVencimento(tarefa) === "Vence hoje"
            ).length
        },
        {
            name: "No prazo",
            value: tarefas.filter(
                tarefa => obterStatusVencimento(tarefa) === "No prazo"
            ).length
        },
        {
            name: "Concluídas",
            value: tarefasConcluidas
        },
        {
            name: "Sem prazo",
            value: tarefas.filter(
                tarefa => !tarefa.vencimento && !tarefa.concluida
            ).length
        }
    ];

    const coresVencimento = [
        "#ef4444",
        "#eab308",
        "#22c55e",
        "#94a3b8",
        "#64748b"
    ];

    // PRÓXIMOS VENCIMENTOS
    const proximosVencimentos = tarefas
        .filter(tarefa => !tarefa.concluida && tarefa.vencimento)
        .sort((a, b) => a.vencimento.localeCompare(b.vencimento))
        .slice(0, 5);

        if (totalTarefas === 0) {
    return (
        <div className="dashboard">

            <h1>Dashboard</h1>

            <div className="dashboard-vazio">

                <span className="icone-vazio">📋</span>

                <h2>Nenhuma tarefa cadastrada</h2>

                <p>
                    Comece cadastrando sua primeira tarefa
                    para acompanhar seu progresso.
                </p>

            </div>

        </div>
    );
}
    return (
        <div className="dashboard">

            <h1>Dashboard</h1>

            <p>Bem-vindo ao DevManager!</p>

            {/* CARTÕES DE ESTATÍSTICAS */}
            <div className="grid-estatisticas">

                <div className="card-estatistica">
                    <h3>Total de tarefas</h3>
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

                <div className="card-estatistica card-atrasadas">
                    <h3>Atrasadas</h3>
                    <p>{tarefasAtrasadas}</p>
                </div>

                <div className="card-estatistica">
                    <h3>Progresso</h3>
                    <p>{progresso}%</p>
                </div>

            </div>

            {/* PAINEL DE PROGRESSO */}
            <div className="painel-progresso">

                <h2>Progresso geral</h2>

                <div className="barra-progresso">

                    <div
                        className="progresso-preenchimento"
                        style={{ width: `${progresso}%` }}
                    />

                </div>

                <p>
                    {tarefasConcluidas} de {totalTarefas} tarefas concluídas
                    ({progresso}%)
                </p>

            </div>

            {/* INÍCIO DO GRID DE DOIS GRÁFICOS */}
            <div className="grid-graficos">

                {/* GRÁFICO DE SITUAÇÃO */}
                <div className="painel-grafico">

                    <h2>Situação das tarefas</h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <PieChart>

                            <Pie
                                data={dadosSituacao}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={65}
                                outerRadius={100}
                                paddingAngle={3}
                                stroke="none"
                            >

                                {dadosSituacao.map((item, index) => (
                                    <Cell
                                        key={item.name}
                                        fill={coresSituacao[index]}
                                    />
                                ))}

                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #475569",
                                    borderRadius: "8px"
                                }}
                                labelStyle={{ color: "#38bdf8" }}
                                itemStyle={{ color: "#f8fafc" }}
                                cursor={{
                                    fill: "rgba(148, 163, 184, 0.08)"
                                }}
                            />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                {/* GRÁFICO DE PRIORIDADES */}
                <div className="painel-grafico">

                    <h2>Tarefas por prioridade</h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <BarChart data={dadosPrioridade}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#475569"
                            />

                            <XAxis
                                dataKey="name"
                                stroke="#94a3b8"
                            />

                            <YAxis
                                stroke="#94a3b8"
                                allowDecimals={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #475569",
                                    borderRadius: "8px"
                                }}
                                labelStyle={{ color: "#38bdf8" }}
                                itemStyle={{ color: "#f8fafc" }}
                                cursor={{
                                    fill: "rgba(148, 163, 184, 0.08)"
                                }}
                            />

                            <Bar
                                dataKey="value"
                                name="Tarefas"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={80}
                            >

                                {dadosPrioridade.map((item, index) => (
                                    <Cell
                                        key={item.name}
                                        fill={coresPrioridade[index]}
                                    />
                                ))}

                            </Bar>

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>
            {/* FIM DO GRID DE DOIS GRÁFICOS */}


            {/* GRÁFICO DE DISTRIBUIÇÃO POR VENCIMENTO */}
            <div className="painel-grafico">

                <h2>Distribuição por vencimento</h2>

                <ResponsiveContainer width="100%" height={300}>

                    <BarChart
                        data={dadosVencimento}
                        layout="vertical"
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#475569"
                        />

                        <XAxis
                            type="number"
                            allowDecimals={false}
                            stroke="#94a3b8"
                        />

                        <YAxis
                            type="category"
                            dataKey="name"
                            width={100}
                            stroke="#94a3b8"
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #475569",
                                borderRadius: "8px"
                            }}
                            labelStyle={{ color: "#38bdf8" }}
                            itemStyle={{ color: "#f8fafc" }}
                            cursor={{
                                fill: "rgba(148, 163, 184, 0.08)"
                            }}
                        />

                        <Bar
                            dataKey="value"
                            name="Tarefas"
                            radius={[0, 6, 6, 0]}
                            maxBarSize={35}
                        >

                            {dadosVencimento.map((item, index) => (
                                <Cell
                                    key={item.name}
                                    fill={coresVencimento[index]}
                                />
                            ))}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>


            {/* PAINEL DE PRÓXIMOS VENCIMENTOS */}
            <div className="painel-grafico">

                <h2>Próximos vencimentos</h2>

                {proximosVencimentos.length === 0 ? (

                    <p className="mensagem-vazia">
                        Nenhuma tarefa pendente com vencimento.
                    </p>

                ) : (

                    <ul className="lista-vencimentos">

                        {proximosVencimentos.map(tarefa => (

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

        </div>
    );
}

export default Dashboard;
