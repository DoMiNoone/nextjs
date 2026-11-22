"use client";

import { useCallback, useEffect, useState } from "react";
import HelloCard from "@/components/hello";

type HelloResponse = {
  message: string;
  time: string;
};

export default function HelloPage() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHello = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/hello", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("โหลดข้อมูลจาก API ไม่สำเร็จ");
      }
      const json = (await res.json()) as HelloResponse;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHello();
  }, [fetchHello]);

  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center bg-zinc-50 px-4 py-12 font-sans dark:bg-black">
      <HelloCard
        data={data}
        loading={loading}
        error={error}
        onRefresh={fetchHello}
      />
    </section>
  );
}