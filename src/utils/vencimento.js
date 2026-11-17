export function obterStatusVencimento(tarefa) {

    const agora = new Date();

    const hoje = agora.getFullYear() + "-" +
        String(agora.getMonth() + 1).padStart(2, "0") + "-" +
        String(agora.getDate()).padStart(2, "0");

    if (!tarefa.vencimento) {
        return "";
    }

    if (tarefa.concluida) {
        return "Concluída";
    }

    if (tarefa.vencimento < hoje) {
        return "Atrasada";
    }

    if (tarefa.vencimento === hoje) {
        return "Vence hoje";
    }

    return "No prazo";
}