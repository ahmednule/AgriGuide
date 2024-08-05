'use client'

import { Button, cn } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({children, endContent}: {
  children: React.ReactNode;
  endContent?: React.ReactNode;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      isLoading={pending}
      size="lg"
      className={cn(
        "bg-emerald-400 self-center font-bold shadow-[0_4px_8px_rgb(0_0_0/0.2)]"
      )}
      endContent={endContent}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
