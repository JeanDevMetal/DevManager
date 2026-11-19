import FormularioTarefa from "../components/FormularioTarefa";
import useTarefas from "../hooks/useTarefas";

function Tarefas() {

    const { tarefas, setTarefas } = useTarefas();
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