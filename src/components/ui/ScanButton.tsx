import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, cn } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

const ScanButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      isLoading={pending}
      size="lg"
      endContent={<FontAwesomeIcon icon={faQrcode} />}
      className={cn(
        "bg-emerald-400 self-center font-bold shadow-[0_4px_8px_rgb(0_0_0/0.2)]"
      )}
    >
      {pending ? "Scanning" : "Scan"}
    </Button>
  );
};

export default ScanButton;
