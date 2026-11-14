
function Header(props) {
    return (
        <header>
            <h1>DevManager</h1>
            <p>Gerenciamento de projetos e tarefas</p>
            <p>Bem-vindo, {props.nome}  Cargo:{props.cargo}!</p>
            
        </header>
    );
}

export default Header;