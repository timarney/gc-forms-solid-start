import { createSignal } from "solid-js";
import { createContext, useContext, JSX } from "solid-js";
import { validateVisibleElements } from "@gcforms/core";

import { parseTemplate } from "./helpers";

type TemplateContextType = [
  ReturnType<typeof useTemplateSignals>,
  any, // template
  any // formRecord
];

function useTemplateSignals(formRecord: any) {
  const [values, setValues] = createSignal<Record<string, string>>({});
  const [errors, setErrors] = createSignal<Record<string, unknown>>({});
  const [visibility, setVisibility] = createSignal(new Map<string, boolean>());
  const [currentGroup, setCurrentGroup] = createSignal<string>("start");

  // Shared validation logic
  const getValidationResults = () => {
    return validateVisibleElements(
      { currentGroup: currentGroup(), ...values() },
      {
        formRecord,
        t: (str) => {
          const strings = {
            "input-validation.required": "This field is required",
          };
          // @ts-ignore
          return strings[str] || str;
        },
      }
    );
  };

  const updateVisibility = () => {
    const { visibility } = getValidationResults();
    setVisibility(visibility);
  };

  const validateAndSetErrors = () => {
    const { errors, visibility } = getValidationResults();
    setErrors(errors);
    setVisibility(visibility);
  };

  const updateValue = (val: { id: string; value: string }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [val.id]: val.value,
    }));

    validateAndSetErrors();
  };

  updateVisibility();

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
  const template = formRecord ? parseTemplate(formRecord.form) : null;
  const signals = useTemplateSignals(formRecord);
  const value: TemplateContextType = [signals, template, formRecord];
  return (
    <TemplateContext.Provider value={value}>
      {props.children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  return useContext(TemplateContext)!;
}
