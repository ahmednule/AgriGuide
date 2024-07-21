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
      className={cn(
        "bg-emerald-400 font-bold shadow-[0_8px_16px_rgb(0_0_0/0.3)]"
      )}
      endContent={<FontAwesomeIcon icon={faEnvelope} />}
    >
      Send
    </Button>
  );
};

export default SubmitButton;
