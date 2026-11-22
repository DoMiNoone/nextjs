"use client";

import { useEffect, useState } from "react";
import TodoForm from "@/components/todo-from";
import TodoItem from "@/components/todo-item";
import type { Todo } from "@/lib/todos";

const JSON_HEADERS = { "Content-Type": "application/json" };

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/todos", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("โหลดรายการไม่สำเร็จ");
        return res.json();
      })
      .then((data: Todo[]) => setTodos(data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "โหลดรายการไม่สำเร็จ")
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(title: string): Promise<boolean> {
    setError("");
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ title }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "เพิ่มรายการไม่สำเร็จ");
      return false;
    }

    setTodos((prev) => [...prev, data]);
    return true;
  }

  async function handleToggle(todo: Todo) {
    setError("");
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({ done: !todo.done }),
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error || "อัปเดตสถานะไม่สำเร็จ");
      return;
    }

    const updated: Todo = json;
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function handleDelete(id: string) {
    setError("");
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });

    if (!res.ok) {
      setError("ลบรายการไม่สำเร็จ");
      return;
    }

    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">งานของฉัน</h1>

        <TodoForm onAdd={handleAdd} />

        {error && (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            กำลังโหลดรายการ...
          </p>
        ) : todos.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            ยังไม่มีรายการงาน ลองเพิ่มงานแรกด้านบนเลยครับ
          </p>
        ) : (
          <ul className="mt-6 flex flex-col gap-2.5">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}