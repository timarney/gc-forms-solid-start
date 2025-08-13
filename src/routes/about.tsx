
import { Title } from "@solidjs/meta";
import { createResource } from "solid-js";


const TEMPLATE_ID = "cmeaj61dl0001xf01aja6mnpf";

async function fetchTemplate(id: string) {
  // Use absolute URL on the server, relative on the client
  const isServer = typeof window === "undefined";
  let url = `/api/templates?id=${id}`;
  if (isServer) {
    // Use API_BASE_URL env var set in wrangler.toml for SSR/Cloudflare
    const base = process.env.API_BASE_URL || "http://localhost:3000";
    url = base + url;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch template");
  return res.json();
}

export default function About() {
  const [template] = createResource(() => TEMPLATE_ID, fetchTemplate);

  return (
    <main>
      <Title>About</Title>
      <h1>About</h1>
      <pre>
        {template.loading && "Loading..."}
        {template.error && `Error: ${template.error.message}`}
        {template() && JSON.stringify(template(), null, 2)}
      </pre>
    </main>
  );
}
