"use client";

import type { Todo } from "@/lib/todos";

type TodoItemProps = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo)}
        className="h-4 w-4 cursor-pointer accent-sky-500"
      />
      <span
        className={`flex-1 text-sm transition ${
          todo.done
            ? "text-slate-400 line-through dark:text-slate-500"
            : "text-slate-800 dark:text-slate-100"
        }`}
      >
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="rounded-lg px-2.5 py-1 text-sm text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400"
      >
        ลบ
      </button>
    </li>
  );
}