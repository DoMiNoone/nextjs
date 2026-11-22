import type { Weather } from "@/lib/weather";

type WeatherCardProps = {
  data: Weather;
  onRefresh?: () => void;
  loading?: boolean;
};

export default function WeatherCard({
  data,
  onRefresh,
  loading = false,
}: WeatherCardProps) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            พื้นที่ที่เลือก
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {data.city}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {data.updatedAt}
          </span>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {loading ? "..." : "รีเฟรช"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-6">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            อุณหภูมิปัจจุบัน
          </p>
          <p className="mt-1 text-5xl font-bold tracking-tight text-sky-600 dark:text-sky-400">
            {data.temperature}°C
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ความเร็วลม
          </p>
          <p className="mt-0.5 text-lg font-semibold text-slate-800 dark:text-slate-200">
            {data.wind} km/h
          </p>
        </div>
      </div>
    </div>
  );
}