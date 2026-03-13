import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const DateRangePicker = ({ dateRange, onDateRangeChange }: DateRangePickerProps) => {
  const fromDate = new Date(process.env.NEXT_PUBLIC_DEFAULT_START_DATE!);
  const toDate = new Date(process.env.NEXT_PUBLIC_DEFAULT_END_DATE!);

  return (
    <div className="card-glass rounded-lg p-4">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
        Date Range
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-mono text-sm bg-background/50 border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span className="text-foreground">
              {dateRange?.from ? (
                <>
                  {format(dateRange.from, "dd MMM")}
                  {dateRange.to && ` – ${format(dateRange.to, "dd MMM yyyy")}`}
                </>
              ) : (
                <span className="text-muted-foreground">Select dates</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
          <CalendarComponent
            mode="range"
            defaultMonth={fromDate}
            selected={dateRange}
            onSelect={onDateRangeChange}
            fromDate={fromDate}
            toDate={toDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
