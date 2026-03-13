import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";
import type { MergedDataPoint } from "@/lib/dataProcessing";
import { motion } from "framer-motion";

interface WindGenerationChartProps {
  data: MergedDataPoint[];
  isLoading: boolean;
}

const WindGenerationChart = ({ data, isLoading }: WindGenerationChartProps) => {
  const chartData = data.map((d) => ({
    ...d,
    time: format(new Date(d.startTime), "dd MMM HH:mm"),
    shortTime: format(new Date(d.startTime), "dd/MM"),
  }));

  if (isLoading) {
    return (
      <div className="card-glass rounded-lg p-6 h-[420px] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-muted-foreground text-sm">Loading generation data...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="card-glass rounded-lg p-6 h-[420px] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No data available for selected range.</p>
      </div>
    );
  }

  // Sample data for readability if too many points
  const sampledData =
    chartData.length > 200
      ? chartData.filter((_, i) => i % Math.ceil(chartData.length / 200) === 0)
      : chartData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-glass rounded-lg p-4 md:p-6"
    >
      <h2 className="text-[10px] md:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 md:mb-4">
        Wind Generation vs Forecast
      </h2>
      <div className="h-[280px] md:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampledData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(220, 14%, 20%)"
              vertical={false}
            />
            <XAxis
              dataKey="shortTime"
              tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(220, 14%, 20%)" }}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis
              tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 18%, 12%)",
                border: "1px solid hsl(220, 14%, 18%)",
                borderRadius: "8px",
                fontFamily: "JetBrains Mono",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(210, 20%, 92%)" }}
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} MW`,
                name === "actualGeneration" ? "Actual" : "Forecast",
              ]}
              labelFormatter={(label) => label}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", fontFamily: "Space Grotesk" }}
              formatter={(value) =>
                value === "actualGeneration" ? "Actual Generation" : "Forecast Generation"
              }
            />
            <Line
              type="monotone"
              dataKey="actualGeneration"
              stroke="hsl(210, 90%, 60%)"
              strokeWidth={2}
              dot={false}
              connectNulls
              name="actualGeneration"
            />
            <Line
              type="monotone"
              dataKey="forecastGeneration"
              stroke="hsl(150, 70%, 50%)"
              strokeWidth={2}
              dot={false}
              connectNulls
              strokeDasharray="4 2"
              name="forecastGeneration"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WindGenerationChart;
