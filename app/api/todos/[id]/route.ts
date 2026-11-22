import { deleteTodo, getTodo, updateTodo } from "@/lib/todos";

type Ctx = {
  params: Promise<{ id: string }>;
};

function notFound() {
  return Response.json({ error: "ไม่พบรายการ Todo นี้" }, { status: 404 });
}

// GET /api/todos/1
export async function GET(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const todo = getTodo(id);
  return todo ? Response.json(todo) : notFound();
}

// PATCH /api/todos/1   body: { "done": true }
export async function PATCH(request: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await request.json().catch(() => null);

  const data: { title?: string; done?: boolean } = {};
  if (typeof body?.title === "string") {
    const trimmed = body.title.trim();
    if (!trimmed) {
      return Response.json(
        { error: "ชื่อรายการต้องไม่เป็นค่าว่าง" },
        { status: 400 }
      );
    }
    data.title = trimmed;
  }
  if (typeof body?.done === "boolean") {
    data.done = body.done;
  }

  const todo = updateTodo(id, data);
  return todo ? Response.json(todo) : notFound();
}

// DELETE /api/todos/1
export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  if (!deleteTodo(id)) return notFound();
  return new Response(null, { status: 204 });
}