import { createEffect, For } from "solid-js";

import { useTemplate } from "~/lib/TemplateContext";
import { ErrorSummary } from "~/components/ErrorSummary";
import { NextButton } from "~/components/NextButton";
import { ElementRenderer } from "~/components/ElementRenderer";

import { getValueFromEvent } from "~/lib/helpers";

export default function Form() {
  // Get context values
  const [signals, template] = useTemplate();
  const { values, errors, visibility, currentGroup, updateValue } = signals;

  createEffect(() => {
    console.log("Form Values:", values());
    console.log("Current Group:", currentGroup());
    console.log("Errors:", errors());
    console.log("Visibility:", visibility());
  });

  if (!template) return <div>Loading...</div>;

  return (
    <>
      <h1 tabindex="-1" id="form-heading">
        {template.pages[currentGroup()]?.group?.titleEn || "Form Title"}
      </h1>
      <form class="form-container">
        <ErrorSummary />

        <For
          each={template.pages[currentGroup()]?.elements.filter(
            (id: string) => {
              return visibility().get(id) === true;
            }
          )}
        >
          {(elementId: string) => {
            const element = template.elementMap[elementId];
            if (!element) return null;
            return (
              <div>
                <ElementRenderer
                  value={values()[elementId] as string}
                  handler={(e: Event | CustomEvent) => {
                    updateValue(getValueFromEvent(e));
                  }}
                  // @ts-ignore
                  error={() => errors()[elementId] || null}
                  element={element}
                />
              </div>
            );
          }}
        </For>

        <NextButton />
      </form>
    </>
  );
}
