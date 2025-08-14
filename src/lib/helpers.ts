import { Responses, PublicFormRecord, FormElement } from "@gcforms/types";
import { validateOnSubmit } from "@gcforms/core/process";

export const scrollToErrorSummary = () => {
  const errorSummary = document.querySelector("#error-summary");

  if (!errorSummary) return;

  // Access the shadow root
  const shadowRoot = errorSummary.shadowRoot;

  if (!shadowRoot) return;

  // Find the element inside the shadow DOM
  const summaryDiv = shadowRoot.querySelector(".gcds-error-summary");

  if (!summaryDiv) return;

  // @ts-ignore
  summaryDiv.focus();
};

export const getValueFromEvent = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const id = target.id;
  const cleanId = id.replace("el-", "");
  const value = target.value;
  return { id: cleanId, value };
};

export const parseTemplate = (template: any) => {
  // Build a map of elements by id for quick lookup
  const elementMap: Record<string, FormElement> = {};
  (template.elements as FormElement[]).forEach((el) => {
    // Only set static properties; do not set isVisible or value here
    elementMap[String(el.id)] = el;
  });

  // Add the start group as the first group if it doesn't exist
  if (!template.groupsLayout.includes("start")) {
    template.groupsLayout.unshift("start");
  }

  // Order groups by groupsLayout, fallback to Object.keys if missing
  const groupOrder: string[] = template.groupsLayout;

  // Order elements by layout
  const elementOrder: string[] = Array.isArray(template.layout)
    ? template.layout.map(String)
    : [];

  const pages: Record<string, { group: any; elements: string[] }> = {};
  for (const groupId of groupOrder) {
    const group = template.groups[groupId];
    if (!group || !Array.isArray(group.elements)) continue;
    // Pick group elements in the order they appear in layout
    const sortedElementIds = elementOrder.filter((id: string) =>
      group.elements.includes(id)
    );
    pages[groupId] = { group, elements: sortedElementIds };
  }

  return { elementMap, groupOrder, elementOrder, pages };
};

/* Wrapper function to validate form responses - to ensure signature consistency  for validateOnSubmit  */
export const validate = ({
  values,
  currentGroup,
  formRecord,
}: {
  values: Responses;
  currentGroup: string;
  formRecord: PublicFormRecord;
}) => {
  console.log("validate ==>", values);
  values.currentGroup = currentGroup;

  const errors = validateOnSubmit(values, {
    formRecord,
    t: (str) => {
      const strings = {
        "input-validation.required": "This field is required",
      };
      // @ts-ignore
      return strings[str] || str;
    },
  });
  return errors;
};
