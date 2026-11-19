import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const TarefasContext = createContext(null);

export function TarefasProvider({ children }) {

    const [tarefas, setTarefas] = useLocalStorage(
        "tarefas",
        [],
        Array.isArray
    );

    return (

        <TarefasContext.Provider
            value={{ tarefas, setTarefas }}
        >

            {children}

        </TarefasContext.Provider>

    );

}