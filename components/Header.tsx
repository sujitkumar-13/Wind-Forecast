import { Wind } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container px-4 md:px-6 flex items-center justify-between h-14 md:h-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 md:gap-3"
        >
          <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Wind className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm md:text-lg font-semibold tracking-tight leading-none mb-0.5 md:mb-0">
              Wind Forecast Monitor
            </h1>
            <p className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
              UK Wind Generation · Jan 2024
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-[9px] md:text-xs text-muted-foreground font-mono">LIVE DATA</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
