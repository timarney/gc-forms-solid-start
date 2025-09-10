import { createSignal, createMemo } from "solid-js";
import { createContext, useContext, JSX } from "solid-js";
import { validateVisibleElements } from "@gcforms/core";
import { FormRecord } from "@gcforms/types";

import { parseTemplate, translate } from "./helpers";

type TemplateContextType = [
  ReturnType<typeof useTemplateSignals>,
  ReturnType<typeof parseTemplate> | null,
  formRecord: FormRecord,
  parseError: string | null
];

function useTemplateSignals(formRecord: FormRecord, parseError: string | null) {
  const [values, setValues] = createSignal<Record<string, string>>({});
  const [errors, setErrors] = createSignal<Record<string, string>>({});
  const [visibility, setVisibility] = createSignal(new Map<string, boolean>());
  const [currentGroup, setCurrentGroup] = createSignal<string>("start");

  const formData = createMemo(() => ({
    currentGroup: currentGroup(),
    ...values(),
  }));

  const updateVisibility = () => {
    const { visibility } = validateVisibleElements(formData(), {
      formRecord,
      t: translate,
    });
    setVisibility(visibility);
  };

  const validateAndSetErrors = () => {
    const { errors, visibility } = validateVisibleElements(formData(), {
      formRecord,
      t: translate,
    });
    setErrors(errors as Record<string, string>);
    setVisibility(visibility);
  };

  const updateValue = (val: { id: string; value: string }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [val.id]: val.value,
    }));

    validateAndSetErrors();
  };

  // Initialize visibility if no parse error and formRecord exists
  if (!parseError && formRecord?.form) {
    updateVisibility();
  }

  return {
    values,
    updateValue,
    setValues,
    errors,
    visibility,
    updateVisibility,
    validateAndSetErrors,
    currentGroup,
    setCurrentGroup,
  };
}

const TemplateContext = createContext<TemplateContextType>();

type TemplateProviderProps = {
  children: JSX.Element;
  formRecord?: any;
};

export function TemplateProvider(props: TemplateProviderProps) {
  const formRecord = props.formRecord ?? null;

  let template = null;
  let parseError = null;

  if (formRecord) {
    try {
      template = parseTemplate(formRecord.form);
    } catch (error) {
      console.error("Failed to parse template:", error);
      parseError =
        error instanceof Error ? error.message : "Unknown parsing error";
    }
  }

  const signals = useTemplateSignals(formRecord, parseError);
  const value: TemplateContextType = [
    signals,
    template,
    formRecord,
    parseError,
  ];
  return (
    <TemplateContext.Provider value={value}>
      {props.children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  return useContext(TemplateContext)!;
}
