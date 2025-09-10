import { useNavigate } from "@solidjs/router";

import { useTemplate } from "~/lib/TemplateContext";
import { scrollToErrorSummary, focusHeading } from "~/lib/helpers";

export function NextButton() {
  const [signals, template, formRecord] = useTemplate();
  const {
    currentGroup,
    setCurrentGroup,
    errors,
    validateAndSetErrors,
    updateVisibility,
  } = signals;
  const navigate = useNavigate();

  const getNextAction = (): { next: string; text: string } => {
    if (!currentGroup()) return { next: "", text: "submit" };

    const { group } = template && template.pages[currentGroup()] ? template.pages[currentGroup()] : {};

    if (!group) {
      return { next: "", text: "submit" };
    }

    const nextAction = group?.nextAction;

    if (nextAction === "review" || nextAction === "end") {
      return { next: "", text: "submit" };
    }
    return { next: nextAction as string, text: "Next" };
  };

  const validate = () => {
    validateAndSetErrors();

    // Scroll to error summary if there are errors
    if (errors() && Object.keys(errors()).length > 0) {
      setTimeout(() => {
        scrollToErrorSummary();
      }, 50);

      return false;
    }

    return true;
  };

  const handleNavigation = () => {
    const nextAction = getNextAction();

    if (
      nextAction.next === "" ||
      nextAction.next === "review" ||
      nextAction.next === "end"
    ) {
      // Navigate to submit page when no next action
      navigate("/confirm");
    } else {
      setCurrentGroup(nextAction.next);
      updateVisibility();
    }

    setTimeout(() => {
      focusHeading();
    }, 50);
  };

  return (
    <gcds-button
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        if (!validate()) {
          return;
        }

        handleNavigation();
      }}
    >
      {getNextAction().text}
    </gcds-button>
  );
}
