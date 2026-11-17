import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Tarefas from "./pages/Tarefas";
import Sidebar from "./components/Sidebar";

import "./styles/DevManager.css";

function App() {

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

    return (
        <HashRouter>
            <div className="app-layout">

                <Sidebar />

                <main className="conteudo-principal">
                    <Routes>

                       <Route
                        path="/"
                            element={<Dashboard tarefas={tarefas} />}
/>
                        <Route
                            path="/tarefas"
                            element={
                                <Tarefas
                                    tarefas={tarefas}
                                    setTarefas={setTarefas}
                                />
                            }
                        />

                    </Routes>
                </main>

            </div>
        </HashRouter>
    );
}

export default App;