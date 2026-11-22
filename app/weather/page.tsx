"use client";

import { useState } from "react";
import WeatherCard from "@/components/weather";
import type { Weather } from "@/lib/weather";

const cities = [
  { id: "bangkok", name: "กรุงเทพฯ" },
  { id: "chiangmai", name: "เชียงใหม่" },
  { id: "phuket", name: "ภูเก็ต" },
];

export default function WeatherPage() {
  const [data, setData] = useState<Weather | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function show(city: string) {
    setSelectedCity(city);
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
        cache: "no-store",
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "ไม่สามารถดึงข้อมูลสภาพอากาศได้");
        setData(null);
      } else {
        setData(json);
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
            Weather Forecast
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">สภาพอากาศ</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            เลือกจังหวัดเพื่อดูอุณหภูมิและความเร็วลมล่าสุด
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {cities.map((c) => {
            const isActive = selectedCity === c.id;
            return (
              <button
                key={c.id}
                type="button"
                disabled={loading}
                onClick={() => show(c.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  isActive
                    ? "bg-sky-600 text-white shadow-sm shadow-sky-600/25 dark:bg-sky-500 dark:text-slate-950"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50/60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500/60 dark:hover:bg-slate-800"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {loading && !data && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            กำลังโหลดข้อมูลสภาพอากาศ...
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        {data && !error && (
          <WeatherCard
            data={data}
            loading={loading}
            onRefresh={selectedCity ? () => show(selectedCity) : undefined}
          />
        )}
      </div>
    </section>
  );
}