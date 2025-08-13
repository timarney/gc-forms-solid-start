

import { Title } from "@solidjs/meta";
import { createResource, onMount } from "solid-js";


const TEMPLATE_ID = "cmeaj61dl0001xf01aja6mnpf";

async function fetchTemplateFromPublic(id: string) {
  const url = `/data/${id}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch local template JSON");
  return res.json();
}


export default function About() {
  const [template] = createResource(() => TEMPLATE_ID, fetchTemplateFromPublic);

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
