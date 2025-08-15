import { createSignal } from "solid-js";
import { createContext, useContext, JSX } from "solid-js";

import { parseTemplate } from "./helpers";
import { validate } from "./helpers";

type TemplateContextType = [
  ReturnType<typeof useTemplateSignals>,
  any, // template
  any // formRecord
];

function useTemplateSignals(formRecord: any) {
  const [values, setValues] = createSignal<Record<string, string>>({});
  const [errors, setErrors] = createSignal<Record<string, unknown>>({});
  const [currentGroup, setCurrentGroup] = createSignal<string>("start");

  const updateValue = (val: { id: string; value: string }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [val.id]: val.value,
    }));

    const errors = validate({
      values: values(),
      currentGroup: currentGroup(),
      formRecord,
    });

    setErrors(errors);
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    currentGroup,
    setCurrentGroup,
    updateValue,
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
