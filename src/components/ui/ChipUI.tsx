import { ScanStatus } from "@/lib/constants";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

const ChipUI = ({
  isScanSuccess,
  formState,
}: {
  isScanSuccess: boolean;
  formState: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {formState &&
        (!pending ? (
          <Chip
            // endContent={
            //   <FontAwesomeIcon icon={isScanSuccess ? faCheck : faXmark} />
            // }
            color={isScanSuccess ? "success" : "danger"}
            className="text-white self-center mt-4"
          >
            {isScanSuccess ? ScanStatus.SUCCESS : ScanStatus.ERROR}
          </Chip>
        ) : null)}
    </>
  );
};

export default ChipUI;
