import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export interface ISalesData {
  date: string;
  totalSales: number;
}

interface ISalesTrendsChartProps {
  salesData: ISalesData[];
}
const SalesTrendsChart = ({ salesData }: ISalesTrendsChartProps) => {
  return (
    <div className="w-full  h-auto bg-amber-100 shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Sales Trends Over Time
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendsChart;
