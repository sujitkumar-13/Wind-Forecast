import { Wind } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Wind className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Wind Forecast Monitor
            </h1>
            <p className="text-xs text-muted-foreground">
              UK Wind Generation · January 2024
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs text-muted-foreground font-mono">LIVE DATA</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
