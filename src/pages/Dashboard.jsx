
import { obterStatusVencimento } from "../utils/vencimento";
import CardEstatistica from "../components/CardEstatistica";
import PainelProgresso from "../components/PainelProgresso";
import GraficoSituacao from "../components/GraficoSituacao";
import GraficoPrioridade from "../components/GraficoPrioridade";
import GraficoVencimento from "../components/GraficoVencimento";
import ProximosVencimentos from "../components/ProximosVencimentos";
import DashboardVazio from "../components/DashboardVazio";
import useTarefas from "../hooks/useTarefas";


 

function Dashboard() {

    const { tarefas } = useTarefas();

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
    return <DashboardVazio />;
}
    return (
        <div className="dashboard">

            <h1>Dashboard</h1>

            <p>Bem-vindo ao DevManager!</p>

           {/* CARTÕES DE ESTATÍSTICAS */}
<div className="grid-estatisticas">

    <CardEstatistica
        titulo="Total de tarefas"
        valor={totalTarefas}
    />

    <CardEstatistica
        titulo="Concluídas"
        valor={tarefasConcluidas}
    />

    <CardEstatistica
        titulo="Pendentes"
        valor={tarefasPendentes}
    />

    <CardEstatistica
        titulo="Atrasadas"
        valor={tarefasAtrasadas}
        classe="card-atrasadas"
    />

    <CardEstatistica
        titulo="Progresso"
        valor={`${progresso}%`}
    />

</div>

            {/* PAINEL DE PROGRESSO */}
<PainelProgresso
    concluidas={tarefasConcluidas}
    total={totalTarefas}
    progresso={progresso}
/>
            {/* INÍCIO DO GRID DE DOIS GRÁFICOS */}
<div className="grid-graficos">

    <GraficoSituacao
        dados={dadosSituacao}
        cores={coresSituacao}
    />

    <GraficoPrioridade
        dados={dadosPrioridade}
        cores={coresPrioridade}
    />

</div>
{/* FIM DO GRID DE DOIS GRÁFICOS */}
            {/* FIM DO GRID DE DOIS GRÁFICOS */}


          
           {/* GRÁFICO DE DISTRIBUIÇÃO POR VENCIMENTO */}
<GraficoVencimento
    dados={dadosVencimento}
    cores={coresVencimento}
/>

            {/* PAINEL DE PRÓXIMOS VENCIMENTOS */}
               <ProximosVencimentos
                tarefas={proximosVencimentos}
            />
             </div>
    );
}

export default Dashboard;
