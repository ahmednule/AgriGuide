import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, cn } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      isLoading={pending}
      size="lg"
      className={cn("bg-slate-400 font-bold animate-slideInFromBottom opacity-0 delay-1000 shadow-[0_8px_16px_rgb(0_0_0/0.3)] hover:!opacity-80", {
        "!opacity-80": pending,
      })}
      endContent={<FontAwesomeIcon icon={faEnvelope} />}
    >
      Send
    </Button>
  );
};

export default SubmitButton;
