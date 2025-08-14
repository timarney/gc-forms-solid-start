import { useNavigate } from "@solidjs/router";

import { useTemplate } from "~/lib/TemplateContext";
import { scrollToErrorSummary, validate } from "~/lib/helpers";

export function NextButton() {
  const [signals, template, formRecord] = useTemplate();
  const { values, setErrors, currentGroup, setCurrentGroup } = signals;
  const navigate = useNavigate();

  const getNextAction = (): { next: string; text: string } => {
    if (!currentGroup()) return { next: "", text: "submit" };

    const { group } = template.pages[currentGroup()];

    if (!group) {
      return { next: "", text: "submit" };
    }

    const nextAction = group?.nextAction;

    if (nextAction === "review" || nextAction === "end") {
      return { next: "", text: "submit" };
    }
    return { next: nextAction, text: "Next" };
  };

  const handleValidation = () => {
    const errorsObj = validate({
      values: values(),
      currentGroup: currentGroup(),
      formRecord,
    });

    if (errorsObj && Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);

      // Add a delay before scrolling
      setTimeout(() => {
        scrollToErrorSummary();
      }, 50);

      return false;
    }

    // reset errors
    setErrors({});
    return true;
  };

  const handleNavigation = () => {
    const nextAction = getNextAction();

    console.log("Next Action:", nextAction);

    if (
      nextAction.next === "" ||
      nextAction.next === "review" ||
      nextAction.next === "end"
    ) {
      // Navigate to submit page when no next action
      navigate("/confirm");
    } else {
      setCurrentGroup(nextAction.next);
    }
  };

  return (
    <gcds-button
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        const isValid = handleValidation();

        if (!isValid) {
          return;
        }

        handleNavigation();
      }}
    >
      {getNextAction().text}
    </gcds-button>
  );
}
