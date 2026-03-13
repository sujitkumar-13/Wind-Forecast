import { motion } from "framer-motion";
import type { ErrorStats, ReliabilityStats } from "@/lib/dataProcessing";
import { TrendingUp, TrendingDown, BarChart3, Zap, AlertTriangle, Activity } from "lucide-react";

interface StatsCardsProps {
  errorStats: ErrorStats;
  reliability: ReliabilityStats;
}

const StatsCards = ({ errorStats, reliability }: StatsCardsProps) => {
  const cards = [
    {
      label: "Mean Error",
      value: `${errorStats.meanError > 0 ? "+" : ""}${errorStats.meanError} MW`,
      icon: errorStats.meanError > 0 ? TrendingUp : TrendingDown,
      description: "Avg forecast bias",
    },
    {
      label: "MAE",
      value: `${errorStats.maeError} MW`,
      icon: BarChart3,
      description: "Mean absolute error",
    },
    {
      label: "RMSE",
      value: `${errorStats.rmseError} MW`,
      icon: Activity,
      description: "Root mean square error",
    },
    {
      label: "P90 Error",
      value: `${errorStats.p90Error} MW`,
      icon: AlertTriangle,
      description: "90th percentile |error|",
    },
    {
      label: "Reliable Capacity (P10)",
      value: `${reliability.p10.toLocaleString()} MW`,
      icon: Zap,
      description: "Available 90% of the time",
    },
    {
      label: "Median Generation",
      value: `${reliability.p50.toLocaleString()} MW`,
      icon: BarChart3,
      description: "50th percentile output",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="card-glass rounded-lg p-3"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">
                {card.label}
              </span>
            </div>
            <p className="text-lg font-semibold font-mono text-foreground">{card.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{card.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
