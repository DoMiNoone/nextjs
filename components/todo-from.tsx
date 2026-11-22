"use client";

import { type FormEvent, useState } from "react";

type TodoFormProps = {
  onAdd: (title: string) => Promise<boolean>;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const ok = await onAdd(title);
      if (ok) {
        setTitle("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="เพิ่มงานใหม่..."
        disabled={submitting}
        className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-sky-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "กำลังเพิ่ม..." : "เพิ่ม"}
      </button>
    </form>
  );
}