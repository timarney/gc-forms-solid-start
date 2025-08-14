import { Title } from "@solidjs/meta";
import { useTemplate } from "~/lib/TemplateContext";

export default function Json() {
  const [, template] = useTemplate();

  return (
    <main>
      <Title>Template Json</Title>
      <gcds-heading tag="h1">Template Json</gcds-heading>
      <pre>{template && JSON.stringify(template, null, 2)}</pre>
    </main>
  );
}
