import FormularioTarefa from "../components/FormularioTarefa";

function Tarefas({ tarefas, setTarefas }) {
    return (
        <div>
            <h1>Gerenciamento de tarefas</h1>

            <FormularioTarefa
                tarefas={tarefas}
                setTarefas={setTarefas}
            />
        </div>
    );
}

export default Tarefas;