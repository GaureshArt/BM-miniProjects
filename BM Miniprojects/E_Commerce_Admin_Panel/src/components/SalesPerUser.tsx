import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


export interface IPieChartData {
    
    userId:string;
    totalProducts:number;
}


interface ISalesPieChartProps {
    data: IPieChartData[];
}


const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

const SalesPerUser = ({ data }:ISalesPieChartProps) => {
    return (
        <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Product sales per User</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie data={data} dataKey="totalProducts" nameKey="userId" cx="50%" cy="50%" outerRadius={120} label>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend  />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesPerUser;
