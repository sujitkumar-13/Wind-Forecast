"use client";

import { useState, useEffect, useMemo } from "react";
import type { DateRange } from "react-day-picker";
import Header from "@/components/Header";
import DateRangePicker from "@/components/DateRangePicker";
import ForecastSlider from "@/components/ForecastSlider";
import WindGenerationChart from "@/components/WindGenerationChart";
import StatsCards from "@/components/StatsCards";
import ErrorDistributionChart from "@/components/ErrorDistributionChart";
import { fetchActualGeneration, fetchForecastGeneration } from "@/lib/api";
import type { ActualGenerationRecord, ForecastRecord } from "@/lib/api";
import { selectForecasts } from "@/lib/forecastLogic";
import {
    mergeData,
    computeErrorStats,
    computeReliability,
} from "@/lib/dataProcessing";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function Home() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(process.env.NEXT_PUBLIC_DEFAULT_START_DATE!),
        to: new Date(process.env.NEXT_PUBLIC_DEFAULT_END_DATE!),
    });
    const [forecastHorizon, setForecastHorizon] = useState(6);
    const [actuals, setActuals] = useState<ActualGenerationRecord[]>([]);
    const [forecasts, setForecasts] = useState<ForecastRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setIsLoading(true);
            setError(null);
            try {
                const [a, f] = await Promise.all([
                    fetchActualGeneration(),
                    fetchForecastGeneration(),
                ]);
                if (!cancelled) {
                    setActuals(a);
                    setForecasts(f);
                }
            } catch (e) {
                if (!cancelled) setError("Failed to load data. Please try again.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    const selectedForecasts = useMemo(
        () => selectForecasts(forecasts, forecastHorizon),
        [forecasts, forecastHorizon]
    );

    const mergedData = useMemo(() => {
        if (!dateRange?.from || !dateRange?.to) return [];
        return mergeData(actuals, selectedForecasts, dateRange.from, dateRange.to);
    }, [actuals, selectedForecasts, dateRange]);

    const errorStats = useMemo(() => computeErrorStats(mergedData), [mergedData]);
    const reliability = useMemo(() => computeReliability(actuals), [actuals]);

    return (
        <div className="min-h-screen bg-background glow-top">
            <Header />
            <main className="container px-4 md:px-6 py-6 space-y-4 md:space-y-6">
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                    >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {error}
                    </motion.div>
                )}

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
                    <ForecastSlider value={forecastHorizon} onChange={setForecastHorizon} />
                </div>

                {/* Stats */}
                {!isLoading && <StatsCards errorStats={errorStats} reliability={reliability} />}

                {/* Main Chart */}
                <WindGenerationChart data={mergedData} isLoading={isLoading} />

                {/* Error Distribution */}
                {!isLoading && mergedData.length > 0 && (
                    <ErrorDistributionChart data={mergedData} />
                )}

                {/* Footer */}
                <div className="text-center text-xs text-muted-foreground py-4 border-t border-border">
                    Data source: BMRS / Elexon · January 2024 · Wind Generation UK
                </div>
            </main>
        </div>
    );
}
