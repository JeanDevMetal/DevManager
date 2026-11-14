import Header from "./components/Header";
 
import FormularioTarefa from "./components/FormularioTarefa";
import "./styles/DevManager.css";
  

function App() {
    return (
        <div className="container">
            <Header nome ="Jean" cargo = "Desenvolvedor"/>
             
            <main>
                <h2>Bem-vindo ao DevManager!</h2>
                <p>
                    Organize seus projetos e acompanhe
                    suas tarefas em um só lugar.
                </p>
                  <p>
                  Seu espaço de produtividade 
                  </p>
                

                <FormularioTarefa />
            </main>
        </div>
    );
}

export default App;