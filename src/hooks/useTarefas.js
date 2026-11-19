import { useContext } from "react";
import { TarefasContext } from "../contexts/TarefasContext";

function useTarefas() {

    const contexto = useContext(TarefasContext);

    if (contexto === null) {

        throw new Error(
            "useTarefas deve ser utilizado dentro de TarefasProvider"
        );

    }

    return contexto;

}

export default useTarefas;