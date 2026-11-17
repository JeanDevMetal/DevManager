

import { NavLink } from "react-router-dom";


function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>DevManager</h2>

            <nav className="menu-lateral">
                <NavLink to="/" end>
                    Dashboard
                </NavLink>

                <NavLink to="/tarefas">
                    Tarefas
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;