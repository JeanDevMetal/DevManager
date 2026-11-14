import { useState } from "react";

function Contador() {
    const [contador, setContador] = useState(0);

    function aumentar() {
        setContador(contador + 1);
    }

    function diminuir() {
        if (contador > 0) {
            setContador(anterior => Math.max(0, anterior - 1));
        }
    }

    return (
        <div>
            <h2>Tarefas concluídas: {contador}</h2>

            <button onClick={aumentar}>
                Concluir tarefa
            </button>

            <button onClick={diminuir}>
                Diminuir
            </button>
        </div>
    );
}

export default Contador;

 