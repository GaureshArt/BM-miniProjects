import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const SalesChart = ({ salesData }: { salesData: { productId: number; totalQuantity: number }[] }) => {
    const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];
    return (
        <div className="w-full  mx-auto bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Product Sales Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                    <XAxis dataKey="productId" tickFormatter={(id) => `Product ${id}`} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalQuantity">
                        {salesData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;
