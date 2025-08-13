import { Responses, PublicFormRecord, FormElement } from "@gcforms/types";
import { validateOnSubmit } from "@gcforms/core/process";

export const scrollToErrorSummary = () => {
  const errorSummary = document.getElementById("error-summary");
  if (errorSummary) {
    const rect = errorSummary.getBoundingClientRect();
    const scrollTop = window.pageYOffset + rect.top - 20;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  }
};

export const getValueFromEvent = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const id = target.id;
  const cleanId = id.replace("el-", "");
  const value = target.value;
  return { id: cleanId, value };
};

export function getFormRecord(template: any) {
  const formRecord: any = {
    id: "1234",
    securityAttribute: "Unclassified",
    isPublished: true,
    form: {
      ...template,
    },
  };
  return formRecord;
}

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

  const grouped: Record<string, { group: any; elements: string[] }> = {};
  for (const groupId of groupOrder) {
    const group = template.groups[groupId];
    if (!group || !Array.isArray(group.elements)) continue;
    // Pick group elements in the order they appear in layout
    const sortedElementIds = elementOrder.filter((id: string) =>
      group.elements.includes(id)
    );
    grouped[groupId] = { group, elements: sortedElementIds };
  }

  return { elementMap, groupOrder, elementOrder, grouped };
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
  values.currentGroup = currentGroup;

  const errors = validateOnSubmit(values, {
    formRecord,
    t: (str) => str,
  });
  return errors;
};
