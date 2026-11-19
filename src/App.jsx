import { HashRouter, Routes, Route } from "react-router-dom";
 

import Dashboard from "./pages/Dashboard";
import Tarefas from "./pages/Tarefas";
import Sidebar from "./components/Sidebar";

import "./styles/DevManager.css";
 

function App() {

    

    return (
        <HashRouter>
            <div className="app-layout">

                <Sidebar />

                <main className="conteudo-principal">
                    <Routes>

                       <Route
    path="/"
    element={<Dashboard />}
/>
                    <Route
    path="/tarefas"
    element={<Tarefas />}
/>

                    </Routes>
                </main>

            </div>
        </HashRouter>
    );
}

export default App;