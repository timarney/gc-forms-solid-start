import { For } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { useTemplate } from "~/lib/TemplateContext";
import { ErrorSummary } from "~/components/ErrorSummary";
import { NextButton } from "~/components/NextButton";
import { ElementRenderer } from "~/components/ElementRenderer";

import { getValueFromEvent } from "~/lib/helpers";

export default function Form() {
  const navigate = useNavigate();
  const [signals, template, , parseError] = useTemplate();
  const { values, errors, visibility, currentGroup, updateValue } = signals;

  // Handle parse errors by navigating to error page
  if (parseError) {
    navigate("/error");
    return <div>Redirecting to error page...</div>;
  }

  /*
  createEffect(() => {
    console.log("Form Values:", values());
    console.log("Current Group:", currentGroup());
    console.log("Errors:", errors());
    console.log("Visibility:", visibility());
  });
  */

  // If template failed to parse, TemplateProvider will handle navigation to error page
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
              <ElementRenderer
                value={values()[elementId] as string}
                handler={(e: Event | CustomEvent) => {
                  updateValue(getValueFromEvent(e));
                }}
                error={() => errors()[elementId] || null}
                element={element}
              />
            );
          }}
        </For>

        <NextButton />
      </form>
    </>
  );
}
