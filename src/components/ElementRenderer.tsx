import type { FormElement } from "~/lib/helpers";

export function ElementRenderer({
  element,
  handler,
  value,
  error,
}: {
  value?: string;
  element: FormElement;
  handler: (e: Event) => void;
  error?: () => string | null;
}) {
  const { properties } = element;

  switch (element.type) {
    case "richText":
      return <div>{properties.descriptionEn}</div>;
    case "textField":
      return (
        <gcds-input
          error-message={error ? error() : null}
          required={properties?.validation?.required}
          id={`el-${element.id}`}
          input-id={element.id}
          label={properties.titleEn}
          value={value || ""}
          on:gcdsChange={handler}
        />
      );
    case "textArea":
      return (
        <gcds-textarea
          error-message={error ? error() : null}
          required={properties?.validation?.required}
          id={`el-${element.id}`}
          input-id={element.id}
          textarea-id={element.id}
          name={element.id}
          hint="Hint / Example message."
          label={properties.titleEn}
          value={value || ""}
          on:gcdsChange={handler}
        />
      );
    case "radio":
      return (
        <gcds-radios
          id={`el-${element.id}`}
          error-message={error ? error() : null}
          required={properties?.validation?.required}
          value={value || ""}
          input-id={element.id}
          name="radio"
          on:gcdsChange={handler}
          legend={properties.titleEn}
          options={element.options}
        />
      );
    default:
      return <div>Unsupported element type: {element.type}</div>;
  }
}
