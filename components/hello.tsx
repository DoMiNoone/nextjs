type HelloData = {
  message: string;
  time: string;
};

type HelloCardProps = {
  data: HelloData | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
};

export default function HelloCard({
  data,
  loading,
  error,
  onRefresh,
}: HelloCardProps) {
  return (
    <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-5 dark:border-zinc-800">
        <div>
          <span className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
            GET /api/hello
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {loading && !data
              ? "กำลังโหลดข้อมูล..."
              : data?.message ?? "API Response"}
          </h1>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-600 dark:hover:bg-sky-500"
        >
          {loading ? "กำลังรีเฟรช..." : "รีเฟรช"}
        </button>
      </div>

      <div className="mt-5">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        {data && !error && (
          <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              เวลาล่าสุดจากเซิร์ฟเวอร์
            </p>
            <p className="mt-1 font-mono text-sm text-zinc-800 dark:text-zinc-200">
              {new Date(data.time).toLocaleString("th-TH")}
            </p>
            <p className="mt-1 font-mono text-xs text-zinc-400 dark:text-zinc-500">
              ISO: {data.time}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}