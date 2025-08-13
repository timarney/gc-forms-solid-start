
import { Title } from "@solidjs/meta";
import { createResource } from "solid-js";


const TEMPLATE_ID = "cmeaj61dl0001xf01aja6mnpf";

async function fetchTemplate(id: string) {
  const res = await fetch(`/api/templates?id=${id}`);
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
