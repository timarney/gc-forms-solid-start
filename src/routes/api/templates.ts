// src/routes/api/templates.ts
import type { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const apiUrl = `https://forms-staging.cdssandbox.xyz/api/templates/${id}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch template" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}