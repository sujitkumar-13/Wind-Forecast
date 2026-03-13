import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";

interface ForecastSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ForecastSlider = ({ value, onChange }: ForecastSliderProps) => {
  return (
    <div className="card-glass rounded-lg p-4">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
        Forecast Horizon
      </label>
      <div className="flex items-center gap-3 mb-3">
        <Clock className="h-4 w-4 text-primary" />
        <span className="text-2xl font-semibold font-mono text-foreground">
          {value}
        </span>
        <span className="text-sm text-muted-foreground">hours ahead</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        min={0}
        max={48}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-muted-foreground font-mono">0h</span>
        <span className="text-[10px] text-muted-foreground font-mono">24h</span>
        <span className="text-[10px] text-muted-foreground font-mono">48h</span>
      </div>
    </div>
  );
};

export default ForecastSlider;
