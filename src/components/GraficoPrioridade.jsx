import { estiloTooltip } from "../utils/configGrafico";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Cell
} from "recharts";

function GraficoPrioridade({ dados, cores }) {

    return (

        <div className="painel-grafico">

            <h2>Tarefas por prioridade</h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={dados}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#475569"
                    />

                    <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                    />

                    <YAxis
                        stroke="#94a3b8"
                        allowDecimals={false}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #475569",
                            borderRadius: "8px"
                        }}
                        labelStyle={{ color: "#38bdf8" }}
                        itemStyle={{ color: "#f8fafc" }}
                        cursor={{
                            fill: "rgba(148, 163, 184, 0.08)"
                        }}
                    />

                    <Bar
                        dataKey="value"
                        name="Tarefas"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={80}
                    >

                        {dados.map((item, index) => (

                            <Cell
                                key={item.name}
                                fill={cores[index]}
                            />

                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default GraficoPrioridade;