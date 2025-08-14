import { Show } from "solid-js";
import { useTemplate } from "~/lib/TemplateContext";

export function ErrorSummary() {
  const [signals] = useTemplate();
  const { errors } = signals;

  const mappedErrors = (): Record<string, unknown> => {
    return Object.keys(errors()).reduce<Record<string, unknown>>(
      (acc, key) => ({
        ...acc,
        [`#el-${key}`]: errors()[key],
      }),
      {}
    );
  };

  return (
    <Show when={errors() && Object.keys(errors()).length > 0}>
      <gcds-error-summary
        id="error-summary"
        error-links={mappedErrors()}
        listen={true}
      />
    </Show>
  );
}
