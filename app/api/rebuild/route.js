import { buildHTML } from "../../lib/template";

export async function POST(req) {
  try {
    const { content, vibe = "bold" } = await req.json();
    if (!content) return Response.json({ error: "No content provided" }, { status: 400 });
    const html = buildHTML(content, vibe);
    return Response.json({ html });
  } catch (err) {
    return Response.json({ error: err.message || "Failed to rebuild" }, { status: 500 });
  }
}
