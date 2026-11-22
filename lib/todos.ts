export type Todo = { id: string; title: string; done: boolean };
type TodoInput = { title?: string; done?: boolean };

const seed: Todo[] = [
  { id: "1", title: "อ่านเอกสาร Route Handler", done: true },
  { id: "2", title: "ทำ API กลาง", done: false },
];

// เก็บไว้ใน globalThis → ทุก route ใช้ข้อมูลชุดเดียวกัน
// และไม่หายตอนแก้โค้ด (แต่หายเมื่อรีสตาร์ตเซิร์ฟเวอร์)
const store = globalThis as unknown as { todos?: Todo[] };
store.todos ??= structuredClone(seed);
const todos = store.todos;

export function getTodos(): Todo[] {
  return todos;
}

export function getTodo(id: string): Todo | undefined {
  return todos.find((t) => t.id === id);
}

export function addTodo(title: string): Todo {
  const todo: Todo = {
    id: crypto.randomUUID(),
    title: title.trim(),
    done: false,
  };
  todos.push(todo);
  return todo;
}

export function updateTodo(id: string, data: TodoInput): Todo | undefined {
  const todo = getTodo(id);
  if (!todo) return undefined;

  if (typeof data.title === "string") {
    todo.title = data.title.trim();
  }
  if (typeof data.done === "boolean") {
    todo.done = data.done;
  }

  return todo;
}

export function deleteTodo(id: string): boolean {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

export function resetTodos(): void {
  todos.splice(0, todos.length, ...structuredClone(seed));
}