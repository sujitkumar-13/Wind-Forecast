import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MergedDataPoint } from "@/lib/dataProcessing";
import { motion } from "framer-motion";

interface ErrorDistributionChartProps {
  data: MergedDataPoint[];
}

const ErrorDistributionChart = ({ data }: ErrorDistributionChartProps) => {
  const errors = data.filter((d) => d.error !== null).map((d) => d.error!);

  if (errors.length === 0) return null;

  // Build histogram
  const binSize = 200;
  const min = Math.floor(Math.min(...errors) / binSize) * binSize;
  const max = Math.ceil(Math.max(...errors) / binSize) * binSize;

  const bins: { range: string; count: number; mid: number }[] = [];
  for (let b = min; b < max; b += binSize) {
    const count = errors.filter((e) => e >= b && e < b + binSize).length;
    bins.push({
      range: `${b}`,
      count,
      mid: b + binSize / 2,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card-glass rounded-lg p-4 md:p-6"
    >
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Forecast Error Distribution
      </h2>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bins} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(220, 14%, 20%)" }}
              interval="preserveStartEnd"
              label={{
                value: "Error (MW)",
                position: "insideBottom",
                offset: -2,
                fill: "hsl(215, 12%, 50%)",
                fontSize: 11,
              }}
            />
            <YAxis
              tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 18%, 12%)",
                border: "1px solid hsl(220, 14%, 18%)",
                borderRadius: "8px",
                fontFamily: "JetBrains Mono",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value} occurrences`, "Count"]}
            />
            <Bar dataKey="count" fill="hsl(35, 90%, 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ErrorDistributionChart;
