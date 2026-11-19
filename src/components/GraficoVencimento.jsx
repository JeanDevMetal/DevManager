
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

function GraficoVencimento({ dados, cores }) {

    return (

        <div className="painel-grafico">

            <h2>Distribuição por vencimento</h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart
                    data={dados}
                    layout="vertical"
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#475569"
                    />

                    <XAxis
                        type="number"
                        allowDecimals={false}
                        stroke="#94a3b8"
                    />

                    <YAxis
                        type="category"
                        dataKey="name"
                        width={100}
                        stroke="#94a3b8"
                    />

                 <Tooltip {...estiloTooltip} />

                    <Bar
                        dataKey="value"
                        name="Tarefas"
                        radius={[0, 6, 6, 0]}
                        maxBarSize={35}
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

export default GraficoVencimento;