

import { estiloTooltip } from "../utils/configGrafico";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function GraficoSituacao({ dados, cores }) {

    return (

        <div className="painel-grafico">

            <h2>Situação das tarefas</h2>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie
                        data={dados}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={3}
                        stroke="none"
                    >

                        {dados.map((item, index) => (

                            <Cell
                                key={item.name}
                                fill={cores[index]}
                            />

                        ))}

                    </Pie>

                   <Tooltip {...estiloTooltip} />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default GraficoSituacao;