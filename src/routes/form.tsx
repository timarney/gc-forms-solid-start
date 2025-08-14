import { createEffect, For } from "solid-js";

import { checkVisibilityRecursive } from "@gcforms/core/visibility";

import { useTemplate } from "~/lib/TemplateContext";
import { ErrorSummary } from "~/components/ErrorSummary";
import { NextButton } from "~/components/NextButton";
import { ElementRenderer } from "~/components/ElementRenderer";

import { getValueFromEvent } from "~/lib/helpers";

export default function Form() {
  // Get context values
  const [signals, template, formRecord] = useTemplate();
  const { values, errors, currentGroup, updateValue } = signals;

  createEffect(() => {
    console.log("Form Values:", values());
    console.log("Current Group:", currentGroup());
    console.log("Errors:", errors());
  });

  if (!template) return <div>Loading...</div>;

  return (
    <>
      <gcds-heading tag="h1">
        {template.pages[currentGroup()]?.group?.titleEn || "Form Title"}
      </gcds-heading>
      <form class="form-container">
        <ErrorSummary />

        <For
          each={template.pages[currentGroup()]?.elements.filter(
            (id: string) => {
              const isVisible = checkVisibilityRecursive(
                formRecord,
                template.elementMap[id],
                values(),
                {}
              );
              return isVisible;
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
